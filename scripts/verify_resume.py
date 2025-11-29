import fitz

pdf_path = r'C:\Users\oomalic\Documents\OMAIR\portfolio-website\public\resume.pdf'
doc = fitz.open(pdf_path)
page = doc[0]

blocks = page.get_text('dict')['blocks']

text_items = []
for block in blocks:
    if 'lines' in block:
        for line in block['lines']:
            for span in line['spans']:
                bbox = span['bbox']
                text = span['text'].strip()
                if text:
                    text_items.append({
                        'text': text[:40],
                        'y0': round(bbox[1]),
                        'y1': round(bbox[3]),
                        'x0': round(bbox[0]),
                        'x1': round(bbox[2])
                    })

text_items.sort(key=lambda x: (x['y0'], x['x0']))

# Check for real overlaps (excluding intentional name stacking)
overlaps = []
for i, item in enumerate(text_items):
    for j, other in enumerate(text_items):
        if i >= j:
            continue
        
        # Skip if it's OMAIR/MALIC name combo
        if item['text'] == 'OMAIR' and other['text'] == 'MALIC':
            continue
            
        v_overlap = item['y0'] < other['y1'] and item['y1'] > other['y0']
        h_overlap = item['x0'] < other['x1'] and item['x1'] > other['x0']
        
        # Only flag if there's significant overlap (more than 2 pixels)
        if v_overlap and h_overlap:
            v_amount = min(item['y1'], other['y1']) - max(item['y0'], other['y0'])
            if v_amount > 2:
                overlaps.append((item['text'], other['text'], v_amount))

if overlaps:
    print('OVERLAPPING TEXT FOUND:')
    for a, b, amt in overlaps[:10]:
        print(f'  "{a}" overlaps with "{b}" by {amt}px')
else:
    print('NO OVERLAPPING TEXT - Resume looks good!')

print(f'\nTotal text elements: {len(text_items)}')
print(f'Page size: {page.rect.width:.0f} x {page.rect.height:.0f}')

last_y = max(item['y1'] for item in text_items) if text_items else 0
print(f'Content ends at Y: {last_y:.0f} (page height: {page.rect.height:.0f})')

if last_y > page.rect.height - 30:
    print('WARNING: Content may be cut off!')
else:
    print('All content fits within page.')

# Show name position
for item in text_items:
    if item['text'] in ['OMAIR', 'MALIC']:
        print(f"{item['text']}: Y position {item['y0']}-{item['y1']}")

doc.close()
