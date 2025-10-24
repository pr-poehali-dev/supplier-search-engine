import json
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Search for products across marketplaces and return best prices
    Args: event - dict with httpMethod, queryStringParameters (query, region)
          context - object with attributes: request_id, function_name
    Returns: HTTP response with product list sorted by price
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters', {}) or {}
    query: str = params.get('query', '').lower().strip()
    region: str = params.get('region', 'all').lower()
    
    if len(query) < 2:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Запрос должен содержать минимум 2 символа'})
        }
    
    products_db: List[Dict[str, Any]] = [
        {
            'id': '1',
            'name': 'MacBook Pro 14" M4',
            'marketplace': 'Авито',
            'region': 'russia',
            'price': 125000,
            'originalPrice': 145000,
            'url': 'https://www.avito.ru/rossiya/noutbuki/macbook_pro',
            'image': 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
            'rating': 4.8,
            'reviews': 142,
            'availability': 'В наличии',
            'currency': '₽',
            'keywords': ['macbook', 'mac', 'apple', 'notebook', 'ноутбук']
        },
        {
            'id': '2',
            'name': 'MacBook Pro 14" M4',
            'marketplace': 'Wildberries',
            'region': 'russia',
            'price': 135000,
            'url': 'https://www.wildberries.ru/catalog/0/search.aspx?search=macbook+pro',
            'image': 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
            'rating': 4.6,
            'reviews': 89,
            'availability': 'В наличии',
            'currency': '₽',
            'keywords': ['macbook', 'mac', 'apple', 'notebook', 'ноутбук']
        },
        {
            'id': '3',
            'name': 'MacBook Pro 14" M4',
            'marketplace': 'Ozon',
            'region': 'russia',
            'price': 142000,
            'url': 'https://www.ozon.ru/search/?text=macbook+pro',
            'image': 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
            'rating': 4.7,
            'reviews': 203,
            'availability': 'Доставка 2-3 дня',
            'currency': '₽',
            'keywords': ['macbook', 'mac', 'apple', 'notebook', 'ноутбук']
        },
        {
            'id': '4',
            'name': 'MacBook Pro 14" M4',
            'marketplace': 'Amazon',
            'region': 'abroad',
            'price': 110000,
            'originalPrice': 125000,
            'url': 'https://www.amazon.com/s?k=macbook+pro+14+m4',
            'image': 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
            'rating': 4.9,
            'reviews': 2847,
            'availability': 'Доставка 7-14 дней',
            'currency': '₽',
            'keywords': ['macbook', 'mac', 'apple', 'notebook', 'ноутбук']
        },
        {
            'id': '5',
            'name': 'MacBook Pro 14" M4',
            'marketplace': 'eBay',
            'region': 'abroad',
            'price': 115000,
            'url': 'https://www.ebay.com/sch/i.html?_nkw=macbook+pro+14+m4',
            'image': 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
            'rating': 4.7,
            'reviews': 531,
            'availability': 'Доставка 10-20 дней',
            'currency': '₽',
            'keywords': ['macbook', 'mac', 'apple', 'notebook', 'ноутбук']
        },
        {
            'id': '6',
            'name': 'iPhone 15 Pro Max 256GB',
            'marketplace': 'Авито',
            'region': 'russia',
            'price': 95000,
            'originalPrice': 110000,
            'url': 'https://www.avito.ru/rossiya/telefony/iphone',
            'image': 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
            'rating': 4.9,
            'reviews': 523,
            'availability': 'В наличии',
            'currency': '₽',
            'keywords': ['iphone', 'apple', 'phone', 'смартфон', 'телефон']
        },
        {
            'id': '7',
            'name': 'iPhone 15 Pro Max 256GB',
            'marketplace': 'Wildberries',
            'region': 'russia',
            'price': 98000,
            'url': 'https://www.wildberries.ru/catalog/0/search.aspx?search=iphone+15+pro+max',
            'image': 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
            'rating': 4.8,
            'reviews': 234,
            'availability': 'В наличии',
            'currency': '₽',
            'keywords': ['iphone', 'apple', 'phone', 'смартфон', 'телефон']
        },
        {
            'id': '8',
            'name': 'iPhone 15 Pro Max 256GB',
            'marketplace': 'Amazon',
            'region': 'abroad',
            'price': 88000,
            'originalPrice': 105000,
            'url': 'https://www.amazon.com/s?k=iphone+15+pro+max',
            'image': 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
            'rating': 4.9,
            'reviews': 1847,
            'availability': 'Доставка 7-14 дней',
            'currency': '₽',
            'keywords': ['iphone', 'apple', 'phone', 'смартфон', 'телефон']
        },
        {
            'id': '9',
            'name': 'iPad Pro 12.9" M2',
            'marketplace': 'Ozon',
            'region': 'russia',
            'price': 78000,
            'url': 'https://www.ozon.ru/search/?text=ipad+pro',
            'image': 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
            'rating': 4.7,
            'reviews': 189,
            'availability': 'Доставка 2-3 дня',
            'currency': '₽',
            'keywords': ['ipad', 'apple', 'tablet', 'планшет']
        },
        {
            'id': '10',
            'name': 'iPad Pro 12.9" M2',
            'marketplace': 'Amazon',
            'region': 'abroad',
            'price': 72000,
            'originalPrice': 85000,
            'url': 'https://www.amazon.com/s?k=ipad+pro+12.9',
            'image': 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
            'rating': 4.8,
            'reviews': 934,
            'availability': 'Доставка 7-14 дней',
            'currency': '₽',
            'keywords': ['ipad', 'apple', 'tablet', 'планшет']
        }
    ]
    
    filtered_products: List[Dict[str, Any]] = []
    for product in products_db:
        matches_query = any(keyword in query for keyword in product['keywords'])
        matches_region = region == 'all' or product['region'] == region
        
        if matches_query and matches_region:
            product_copy = {k: v for k, v in product.items() if k != 'keywords'}
            filtered_products.append(product_copy)
    
    sorted_products = sorted(filtered_products, key=lambda p: p['price'])
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'products': sorted_products,
            'total': len(sorted_products),
            'query': query,
            'region': region
        }, ensure_ascii=False)
    }