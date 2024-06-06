import json
import ast

def fix_numeric_string(value):
    if value == "":
        return 0.0

    value = value.replace('.', '', value.count('.') - 1)  
    return float(value)

def convert_to_list(value):
    try:
        return ast.literal_eval(value)
    except (ValueError, SyntaxError):
        return value

def convert_to_int(value, default=0):
    try:
        return int(value.replace(',', ''))
    except (ValueError, AttributeError):
        return default

with open('./dataset.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for i in range(len(data)):
    if isinstance(data[i]['rating'], str):
        data[i]['rating'] = fix_numeric_string(data[i]['rating'])
    else:
        data[i]['rating'] = float(data[i]['rating']) if data[i]['rating'] != "" else 0.0

    if isinstance(data[i]['price'], str):
        data[i]['price'] = fix_numeric_string(data[i]['price'])
    else:
        data[i]['price'] = float(data[i]['price']) if data[i]['price'] != "" else 0.0

    for key in ['genres', 'characters', 'awards', 'ratingsByStars', 'setting']:
        if isinstance(data[i][key], str):
            data[i][key] = convert_to_list(data[i][key])
    
    if isinstance(data[i]['author'], str) and ',' in data[i]['author']:
        data[i]['author'] = [author.strip() for author in data[i]['author'].split(',')]
    
    for key in ['numRatings', 'likedPercent', 'bbeScore', 'bbeVotes']:
        if isinstance(data[i][key], str) or data[i][key] == "":
            data[i][key] = convert_to_int(data[i][key])
        elif isinstance(data[i][key], (int, float)):
            data[i][key] = int(data[i][key])

    if isinstance(data[i]['pages'], str) or data[i]['pages'] == "":
        data[i]['pages'] = convert_to_int(data[i]['pages'])

with open('./dataset_final1.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

