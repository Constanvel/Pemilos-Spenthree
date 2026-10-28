"""Rebuild the prototype while preserving the supplied iframe wrapper and CSP."""
from pathlib import Path
import base64
import html
import re

ROOT = Path(__file__).resolve().parent
template = (ROOT / 'template.html').read_text(encoding='utf-8')
match = re.search(r'data-srcdoc="([\s\S]*?)"', template)
if not match:
    raise ValueError('Sandboxed iframe data-srcdoc not found')
inner = html.unescape(match.group(1))
start = inner.index('<div id="pv-stage"')
end = inner.index('</script>', start) + len('</script>')
markup = (ROOT / 'src/ui.html').read_text(encoding='utf-8')
for asset in (ROOT / 'assets').glob('*.png'):
    markup = markup.replace('../assets/' + asset.name, 'data:image/png;base64,' + base64.b64encode(asset.read_bytes()).decode('ascii'))
css = (ROOT / 'src/styles.css').read_text(encoding='utf-8')
js = (ROOT / 'src/app.js').read_text(encoding='utf-8')
if '</script' in js.lower():
    raise ValueError('Escape literal script closing tags in app.js before building')
root_end = markup.index('>') + 1
fragment = markup[:root_end] + '\n<style>\n' + css + '\n</style>\n' + markup[root_end:] + '\n<script>\n' + js + '\n</script>'
updated = inner[:start] + fragment + inner[end:]
result = template[:match.start(1)] + html.escape(updated, quote=True) + template[match.end(1):]
(ROOT / 'index.html').write_text(result, encoding='utf-8')
print('Built index.html with the original iframe sandbox and CSP.')
