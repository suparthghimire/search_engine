from flask import request, jsonify

# local imports

from search.QueryEngine import QueryEngine

def getSearch():
    query = request.args.get('q')
    page = request.args.get('page')
    limit = request.args.get('limit')

    if page == None:
        page = 1
    elif not page.isdigit():
        page = 1
    else:
        page = int(page)

    if limit == None:
        limit = 100
    elif not limit.isdigit():
        limit = 100
    else:
        limit = int(limit)

    if query == None:
        return jsonify({"error": "No query provided"}), 400
    if len(query) < 3:
        return jsonify({"error": "Query too short"}), 400
    if len(query) > 100:
        return jsonify({"error": "Query too long"}), 400
   
    queryEngine = QueryEngine(query)
    websites = queryEngine.get_rank_websites()

    # pagination: for each page, add 100 results
    start = (page - 1) * limit
    end = start + limit
    print(len(websites), start)
    if(start > len(websites) - 1):
        websites = []
        
    else:
        websites = websites[start:end]


    nextPageNo = page + 1
    if(len(websites) < limit):
        nextPageNo = None
    prevPageNo = page - 1

    if(prevPageNo < 1):
        prevPageNo = None

    return jsonify({"data":{
        "query": query, 
        "websites": websites, 
        "nextPageNo": nextPageNo, 
        "prevPageNo": prevPageNo
        }
    }), 200
    