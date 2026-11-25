import sys, json, time, os
from playwright.sync_api import sync_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8765/'
LANG = sys.argv[2] if len(sys.argv) > 2 else 'ro'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'shots'); os.makedirs(OUT, exist_ok=True)
errors = []
ROBOT = {
 'logic/sequence': [['R','R','R','R'], ['D','D','R','R','R','R'], ['R','R','R','D','D','L','L','L']],
 'logic/loops': [[('loop',6,['R'])], [('loop',4,['R','D'])], [('loop',4,['R']),('loop',2,['D']),('loop',4,['L'])]],
}
ARROW = {'U':'U','D':'D','L':'L','R':'R'}

def tr(page, js): return page.evaluate(js)

def play_robot(page, key, shots):
    n = len(tr(page, f"COURSES.find(c=>c.id=='{key.split('/')[0]}').lessons.find(l=>l.id=='{key.split('/')[1]}').activity.levels"))
    for lv in range(n):
        page.wait_for_selector('.rgrid')
        if key == 'logic/debug':
            if lv == 0: page.locator('.prog > .blk').nth(2).locator('.x').click()
            elif lv == 1: page.locator('.prog > .blk').nth(7).locator('.rot').click(); page.locator('.prog > .blk').nth(7).locator('.rot').click()
            else: page.locator('.lcount').click()
        else:
            for blk in ROBOT[key][lv]:
                if isinstance(blk, tuple):
                    page.click('.loopbtn')
                    for d in blk[2]: page.click(f'.cmd[data-cmd="{d}"]')
                    page.click('.loopbtn.end')
                    for _ in range(blk[1]-2): page.locator('.lcount').last.click()
                else: page.click(f'.cmd[data-cmd="{blk}"]')
        if shots and lv == 1 and key == 'logic/loops': page.wait_for_timeout(400); page.screenshot(path=f'{OUT}/game-robot.png', full_page=False)
        page.click('.run')
        if lv < n-1:
            page.wait_for_selector(f'.stat:has-text("{lv+2}/")', timeout=15000)
    page.wait_for_selector('.modal', timeout=15000)

def play(page, cid, lid, shots):
    a = tr(page, f"COURSES.find(c=>c.id=='{cid}').lessons.find(l=>l.id=='{lid}').activity")
    t = lambda o: o[LANG]
    typ = a['type']
    if typ == 'match':
        # one real pointer drag first
        chip = page.locator('.pool .chip').first; i = chip.get_attribute('data-i')
        tgt = page.locator(f'.target[data-i="{i}"]')
        cb, tb = chip.bounding_box(), tgt.bounding_box()
        page.mouse.move(cb['x']+10, cb['y']+10); page.mouse.down(); page.mouse.move(cb['x']+40, cb['y']+40, steps=5)
        page.mouse.move(tb['x']+tb['width']-30, tb['y']+tb['height']/2, steps=10); page.mouse.up()
        while page.locator('.pool .chip').count():
            c = page.locator('.pool .chip').first; i = c.get_attribute('data-i'); c.click(); page.click(f'.target[data-i="{i}"]')
    elif typ == 'sort':
        if shots: page.wait_for_timeout(500); page.screenshot(path=f'{OUT}/game-sort-{cid}-{lid}.png')
        while page.locator('.sortpool .chip').count():
            c = page.locator('.sortpool .chip').first; b = c.get_attribute('data-bin'); c.click(); page.click(f'.bin[data-bin="{b}"] .binlabel')
    elif typ == 'memory':
        texts = {}
        for k, p in enumerate(a['pairs']): texts[t(p[0])] = k; texts[t(p[1])] = k
        cards = page.locator('.mcard'); n = cards.count()
        ids = [texts[cards.nth(j).locator('.mback').inner_text().strip()] for j in range(n)]
        done = set()
        for j in range(n):
            if j in done: continue
            m = [x for x in range(n) if ids[x] == ids[j] and x != j][0]
            cards.nth(j).click(); cards.nth(m).click(); done |= {j, m}; page.wait_for_timeout(450)
    elif typ == 'typing':
        for w in a['words'][LANG]:
            page.locator('.tinput').type(w, delay=20)
    elif typ == 'password':
        for _ in a['rounds']:
            page.wait_for_selector('.pwopt:not([disabled])')
            best = page.evaluate("(()=>{const o=[...document.querySelectorAll('.pwopt code')].map(c=>c.textContent);return pwCheck(o[0],'').bits>pwCheck(o[1],'').bits?0:1})()")
            page.locator('.pwopt').nth(best).click(); page.wait_for_timeout(1700)
        page.fill('.pwin', 'Dragon!Albastru7Luna')
        if shots: page.screenshot(path=f'{OUT}/game-password.png')
        page.click('.pwgo')
    elif typ == 'flags':
        for mi, msg in enumerate(a['messages']):
            page.wait_for_selector('.part')
            for k, p in enumerate(msg['parts']):
                if p['f']: page.click(f'.part[data-i="{k}"]')
            if mi < len(a['messages'])-1: page.click('.nextmsg')
    elif typ == 'ifthen':
        for r in a['rounds']:
            for _ in r['items']:
                page.wait_for_selector('.ifb:not([disabled])')
                o = page.locator('.obj').inner_text().strip(); v = [x[1] for x in r['items'] if x[0] == o][0]
                page.click(f'.ifb[data-v="{v}"]'); page.wait_for_timeout(650)
    elif typ == 'order':
        for r in a['rounds']:
            steps = [t(s) for s in r['steps']]
            page.wait_for_selector('.order')
            for target in range(len(steps)):
                while True:
                    cur = [x.strip() for x in page.locator('.otxt').all_inner_texts()]
                    pos = cur.index(steps[target])
                    if pos == target: break
                    page.click(f'.ob[data-k="{pos}"][data-d="-1"]')
            page.click('.ocheck'); page.wait_for_timeout(1200)
    elif typ == 'swap':
        for _ in a['rounds']:
            page.wait_for_selector('.sw:not([disabled])')
            while True:
                vals = [int(x) for x in page.locator('.vbar span').all_inner_texts()]
                k = next((i for i in range(len(vals)-1) if vals[i] > vals[i+1]), None)
                if k is None: break
                page.click(f'.sw[data-k="{k}"]')
            page.wait_for_timeout(1300)
    elif typ == 'binary':
        for r in a['rounds']:
            page.wait_for_selector('.bcheck:not([disabled])')
            bits = format(r['n'], f"0{r['bits']}b")
            for k, b in enumerate(bits):
                if b == '1': page.click(f'.bcard[data-k="{k}"]')
            page.click('.bcheck'); page.wait_for_timeout(1000)
    elif typ == 'pixel':
        for im in a['images']:
            page.wait_for_selector('.pcheck:not([disabled])')
            for y, row in enumerate(im['rows']):
                for x, ch in enumerate(row):
                    if ch == '1': page.click(f'.px[data-x="{x}"][data-y="{y}"]')
            if shots: page.screenshot(path=f'{OUT}/game-pixel.png')
            page.click('.pcheck'); page.wait_for_timeout(1700)
    elif typ == 'robot':
        play_robot(page, f'{cid}/{lid}', shots)
    page.wait_for_selector('.modal .rstars', timeout=15000)

def run():
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        ctx = b.new_context(viewport={'width': 1280, 'height': 860}, accept_downloads=True)
        page = ctx.new_page()
        page.on('pageerror', lambda e: errors.append('pageerror: ' + str(e)))
        page.on('console', lambda m: errors.append('console: ' + m.text) if m.type == 'error' else None)
        page.goto(URL); page.wait_for_selector('.newp')
        if LANG == 'en': page.click('.lang button[data-l="en"]')
        page.screenshot(path=f'{OUT}/welcome.png')
        page.fill('#nm', 'Ana Maria'); page.click('.avbtn >> nth=4'); page.click('.newp button[type=submit]')
        page.wait_for_selector('.courses'); page.screenshot(path=f'{OUT}/dashboard-empty.png')
        courses = tr(page, "COURSES.map(c=>({id:c.id,lessons:c.lessons.map(l=>l.id),quiz:c.quiz}))")
        for c in courses:
            page.goto(URL + f"#/course/{c['id']}"); page.wait_for_selector('.path')
            for i, lid in enumerate(c['lessons']):
                page.goto(URL + f"#/lesson/{c['id']}/{i}"); page.wait_for_selector('.slide')
                if c['id'] == 'logic' and i == 0: page.wait_for_timeout(600); page.screenshot(path=f'{OUT}/lesson-slide.png')
                while page.locator('.slide').count():
                    page.click('.nxt')
                page.wait_for_selector('.gamebox')
                play(page, c['id'], lid, shots=True)
                stars = page.locator('.rstars .on').count()
                print(f"  {c['id']}/{lid}: {stars} stars")
                page.keyboard.press('Escape')
            page.goto(URL + f"#/quiz/{c['id']}"); page.wait_for_selector('.qtext')
            for _ in c['quiz']:
                q = page.locator('.qtext').inner_text().strip()
                corr = [x for x in c['quiz'] if x['q'][LANG] == q][0]
                page.click(f".ans[data-k=\"{corr['c']}\"]"); page.click('.qnext')
            page.wait_for_selector('.bigscore'); print(f"  quiz {c['id']}: {page.locator('.bigscore').inner_text()}")
            page.click('.modal a.primary'); page.wait_for_selector('.certificate')
            if c['id'] == 'computer':
                page.wait_for_timeout(4200); page.screenshot(path=f'{OUT}/certificate.png')
                with page.expect_download() as d: page.click('.dl')
                d.value.save_as(f'{OUT}/certificate-download.png')
                page.pdf(path=f'{OUT}/certificate.pdf', landscape=True, format='A4', print_background=True) if False else None
        page.goto(URL + '#/map'); page.wait_for_selector('.courses'); page.wait_for_timeout(900)
        page.screenshot(path=f'{OUT}/dashboard.png')
        page.goto(URL + '#/badges'); page.wait_for_selector('.badges'); print('  badges:', page.locator('.badge.on').count(), '/', page.locator('.badge').count())
        page.screenshot(path=f'{OUT}/badges.png', full_page=True)
        # print-to-PDF of a certificate
        page.goto(URL + '#/cert/safety'); page.wait_for_selector('.certificate'); page.emulate_media(media='print')
        page.pdf(path=f'{OUT}/certificate.pdf', landscape=True, format='A4', print_background=True); page.emulate_media(media='screen')
        # parents area
        page.goto(URL + '#/parents'); page.wait_for_selector('.gate')
        lbl = page.locator('.gate label').inner_text(); import re; nums = [int(x) for x in re.findall(r'\d+', lbl)]
        page.fill('#ga', str(nums[0]*nums[1])); page.click('.gate button'); page.wait_for_selector('.ptable'); page.screenshot(path=f'{OUT}/parents.png', full_page=True)
        st = page.evaluate("JSON.parse(localStorage.getItem('itAdventure.v1'))")
        pl = list(st['players'].values())[0]; print('  xp', pl['xp'], 'lessons', len(pl['lessons']), 'badges', pl['badges'])
        # tablet viewport check
        tab = b.new_context(viewport={'width': 820, 'height': 1180}, has_touch=True, is_mobile=True)
        tp = tab.new_page(); tp.on('pageerror', lambda e: errors.append('tablet pageerror: ' + str(e)))
        tp.goto(URL); tp.fill('#nm', 'Tabletă'); tp.click('.newp button[type=submit]'); tp.wait_for_selector('.courses'); tp.screenshot(path=f'{OUT}/tablet-dashboard.png')
        tp.goto(URL + '#/lesson/logic/0'); 
        while tp.locator('.slide').count(): tp.tap('.nxt')
        tp.wait_for_selector('.rgrid'); tp.tap('.cmd[data-cmd="R"]'); tp.screenshot(path=f'{OUT}/tablet-robot.png')
        sw = tp.evaluate('document.documentElement.scrollWidth'); print('  tablet scrollWidth', sw)
        b.close()
    print('ERRORS:', errors if errors else 'none')
run()
