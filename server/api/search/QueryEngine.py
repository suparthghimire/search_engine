import pandas as pd 
import string 
import numpy as np 
import nltk
import bson
import pymongo as pm
from itertools import chain
import math 
import asyncio
from bson.objectid import ObjectId

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer, WordNetLemmatizer


# local imports
from search.database import token_collection, website_collection

class QueryEngine:
    def __init__(self, query):
        self.query = query
        self.total_websites = website_collection.count_documents({})
    
   
    def _tokenize(self):
        nepaliStopWords = ["अझै","अधिक","अन्य","अन्यत्र","अन्यथा","अब","अरु","अरुलाई","अर्को","अर्थात","अर्थात्","अलग","आए","आजको","आत्म","आदि","आफू","आफूलाई","आफै","आफैलाई","आफैले","आफ्नै","आफ्नो","आयो","उनको","उनले","उनि","उनी","उनीहरु","उप","उसलाई","उस्तै","उहाँ","उहालाई","ऊ","एउटै","एक","एकदम","ओठ","औं","कतै","कसरी","कसै","कसैले","कस्तो","कहाँ","कहाँबाट","कहिले","कहिलेकाहीं","का","कि","किन","किनभने","कुनै","कुरा","कृपया","के","केवल","केहि","केही","को","कोही","गए","गयौ","गर","गरि","गरी","गरे","गरेका","गरेको","गरेर","गरौं","गर्छ","गर्छु","गर्दछ","गर्दै","गर्न","गर्नु","गर्नुपर्छ","गर्ने","गर्नेछन्","गर्नेछौ","गैर","चार","चाले","चाहनुहुन्छ","चाहन्छु","चाहन्छौ","चाहन्छौं","चाहन्थे","चाहिए","छ","छन्","छु","छू","छैन","छौं","जब","जबकि","जसको","जसबाट","जसमा","जसलाई","जसले","जस्तै","जस्तो","जहाँ","जान","जाहिर","जुन","जे","जो","ठीक","त","तत्काल","तथा","तदनुसार","तपाई","तपाईं","तपाईको","तर","तल","तापनी","तिनिहरुलाई","तिनी","तिनीहरुको","तिनीहरू","तिनीहरूको","तिमि","तिमी","तिमीसँग","तिम्रो","तिर","ती","तीन","तुरुन्तै","तेस्कारण","तेस्रो","त्यसपछि","त्यहाँ","त्यो","त्सपछि","त्सैले","थप","थिए","थिएन","थिएनन्","थियो","दिए","दिनुभएको","दिनुहुन्छ","दुई","दुबै","देखि","देखिन्छ","देखियो","देखे","देखेको","देखेर","दोस्रो","द्वारा","धेरै","न","नगर्नुहोस्","नजिकै","नत्र","नयाँ","नि","निम्ति","निम्न","नै","नौ","पक्का","पक्कै","पछि","पछिल्लो","पटक","पनि","पर्छ","पर्थ्यो","पर्याप्त","पहिले","पहिलो","पहिल्यै","पाँच","पाँचौं","पूर्व","प्रति","प्रतेक","प्रत्येक","प्लस","फेरि","फेरी","बने","बन्द","बरु","बाट","बारे","बारेमा","बाहिर","बाहेक","बिरुद्ध","बिशेष","बीच","बीचमा","भए","भएको","भन","भने","भन्","भन्छन्","भन्छु","भन्दा","भन्नुभयो","भन्ने","भर","भित्र","भित्री","म","मँ","मलाई","मा","मात्र","माथि","मार्फत","मुख्य","मेरो","मैले","यति","यथोचित","यदि","यद्यपि","यस","यसको","यसपछि","यसबाहेक","यसरी","यसैले","यसो","यस्तो","यहाँ","यहाँसम्म","या","यी","यो","र","रही","रहेका","रहेको","राखे","राख्छ","राम्रो","रूप","लगभग","लाई","लागि","ले","वरीपरी","वा","वास्तवमा","विरुद्ध","शायद","सकदिन","सकिएन","सक्छ","सक्दैन","संग","संगै","सट्टा","सधै","सबै","सबैलाई","समय","समयमा","सम्भव","सम्म","सही","साँच्चै","सात","साथ","साथै","सायद","सारा","सो","सोही","स्पष्ट","हरे","हरेक","हामी","हामीसँग","हाम्रो","हुँ","हुँदैन","हुन","हुनु","हुनुहुन्छ","हुने","हुनेछ","हुनेछु","हुन्","हुन्छ","हुन्थे","हो","होइन","हौंअझै","अधिक","अन्य","अन्यत्र","अन्यथा","अब","अरु","अरुलाई","अर्को","अर्थात","अर्थात्","अलग","आए","आजको","आत्म","आदि","आफू","आफूलाई","आफै","आफैलाई","आफैले","आफ्नै","आफ्नो","आयो","उनको","उनले","उनि","उनी","उनीहरु","उप","उसलाई","उस्तै","उहाँ","उहालाई","ऊ","एउटै","एक","एकदम","ओठ","औं","कतै","कसरी","कसै","कसैले","कस्तो","कहाँ","कहाँबाट","कहिले","कहिलेकाहीं","का","कि","किन","किनभने","कुनै","कुरा","कृपया","के","केवल","केहि","केही","को","कोही","गए","गयौ","गर","गरि","गरी","गरे","गरेका","गरेको","गरेर","गरौं","गर्छ","गर्छु","गर्दछ","गर्दै","गर्न","गर्नु","गर्नुपर्छ","गर्ने","गर्नेछन्","गर्नेछौ","गैर","चार","चाले","चाहनुहुन्छ","चाहन्छु","चाहन्छौ","चाहन्छौं","चाहन्थे","चाहिए","छ","छन्","छु","छू","छैन","छौं","जब","जबकि","जसको","जसबाट","जसमा","जसलाई","जसले","जस्तै","जस्तो","जहाँ","जान","जाहिर","जुन","जे","जो","ठीक","त","तत्काल","तथा","तदनुसार","तपाई","तपाईं","तपाईको","तर","तल","तापनी","तिनिहरुलाई","तिनी","तिनीहरुको","तिनीहरू","तिनीहरूको","तिमि","तिमी","तिमीसँग","तिम्रो","तिर","ती","तीन","तुरुन्तै","तेस्कारण","तेस्रो","त्यसपछि","त्यहाँ","त्यो","त्सपछि","त्सैले","थप","थिए","थिएन","थिएनन्","थियो","दिए","दिनुभएको","दिनुहुन्छ","दुई","दुबै","देखि","देखिन्छ","देखियो","देखे","देखेको","देखेर","दोस्रो","द्वारा","धेरै","न","नगर्नुहोस्","नजिकै","नत्र","नयाँ","नि","निम्ति","निम्न","नै","नौ","पक्का","पक्कै","पछि","पछिल्लो","पटक","पनि","पर्छ","पर्थ्यो","पर्याप्त","पहिले","पहिलो","पहिल्यै","पाँच","पाँचौं","पूर्व","प्रति","प्रतेक","प्रत्येक","प्लस","फेरि","फेरी","बने","बन्द","बरु","बाट","बारे","बारेमा","बाहिर","बाहेक","बिरुद्ध","बिशेष","बीच","बीचमा","भए","भएको","भन","भने","भन्","भन्छन्","भन्छु","भन्दा","भन्नुभयो","भन्ने","भर","भित्र","भित्री","म","मँ","मलाई","मा","मात्र","माथि","मार्फत","मुख्य","मेरो","मैले","यति","यथोचित","यदि","यद्यपि","यस","यसको","यसपछि","यसबाहेक","यसरी","यसैले","यसो","यस्तो","यहाँ","यहाँसम्म","या","यी","यो","र","रही","रहेका","रहेको","राखे","राख्छ","राम्रो","रूप","लगभग","लाई","लागि","ले","वरीपरी","वा","वास्तवमा","विरुद्ध","शायद","सकदिन","सकिएन","सक्छ","सक्दैन","संग","संगै","सट्टा","सधै","सबै","सबैलाई","समय","समयमा","सम्भव","सम्म","सही","साँच्चै","सात","साथ","साथै","सायद","सारा","सो","सोही","स्पष्ट","हरे","हरेक","हामी","हामीसँग","हाम्रो","हुँ","हुँदैन","हुन","हुनु","हुनुहुन्छ","हुने","हुनेछ","हुनेछु","हुन्","हुन्छ","हुन्थे","हो","होइन","हौं"]
        punctuation = string.punctuation + "।" + "!" + "?"
        stopWordsEn = set(stopwords.words("english"))
        stopWordsNp = set(nepaliStopWords)
        stopWordsCombined = stopWordsEn.union(stopWordsNp)
        
        # Remove Punctuations
        self.query = self.query.translate(str.maketrans("", "", punctuation))
        # Tokenize Word     
        tokens = word_tokenize(self.query)
        # Remove Stop Words     
        tokens = [token for token in tokens if token.lower() not in stopWordsCombined]
        
        # Stemming     
        stemmerEn = SnowballStemmer("english")
        tokens = [stemmerEn.stem(token) for token in tokens]
        
        # Lemmatization
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(token) for token in tokens]
        
        tokens_occ = []
        
        for token in set(tokens):
            occurances = [index for index, value in enumerate(tokens) if value == token]
            tokens_occ.append({"token": token, "occurrences": occurances})
        return tokens_occ
    
    def _extract_tokens(self, tokenized_query):
        return [t["token"] for t in tokenized_query]

    def _calc_tf_idf(self, tokenized_query, extracted_tokens):
        # Find all websites where each tokens occur
        pipeline = [
            {
                "$match": {
                    "token": {"$in": extracted_tokens}
                }
            },
        ]
        token_db_cursor = token_collection.aggregate(pipeline)
        token_db_list = list(token_db_cursor)

        # Calculate TF-IDF
        #table where keys are website_ids and value is dict of tokens whose value is tf_idf = tdf * idf
        idf_table = {} 
        total_docs_token_is_in = {}
        for token in token_db_list:
            total_docs_token_is_in[token["token"]] = len(token["websites"])
            for website in token["websites"]:
                table_key = str(website["_id"])
                occurrences = website["occurrences"]
                if table_key not in idf_table:
                    idf_table[table_key] = {}
                    idf_table[table_key][token["token"]] = {"occurrences": occurrences}              
                else:
                    idf_table[table_key][token["token"]] = {"occurrences": occurrences}    
        

        website_ids = list([ObjectId(k) for k in idf_table.keys()])
        websites = list(website_collection.find({"_id": {"$in": website_ids}}, {"total_tokens":1, "_id": 1}))
        websites_token_cnt = [{"_id": str(ws["_id"]), "token_len": len(ws["total_tokens"])} for ws in websites]

        document_vector = {}
        query_vector = []

        #needed for query vector
        token_idf = {} 

        # creating document vector
        for idx, ws in enumerate(websites_token_cnt):
            idf_table_tokens = idf_table[ws["_id"]]
            for qToken in extracted_tokens:
                if qToken not in idf_table_tokens.keys():
                    idf_table_tokens[qToken] = {"occurrences": []}
                    
            for token in idf_table_tokens:
                curr_token_freq_in_ws = len(idf_table_tokens[token]["occurrences"])
                total_tokens_in_ws =  ws["token_len"]
                
                
                
                token_ws_tf = curr_token_freq_in_ws / total_tokens_in_ws
                token_ws_idf = math.log(self.total_websites / total_docs_token_is_in[token])
                token_ws_tfidf = token_ws_tf * token_ws_idf
                
                token_idf[token] = token_ws_idf
                
                idf_table_tokens[token]["tfidf"] = token_ws_tfidf
                idf_table_tokens[token]["idf"] = token_ws_idf
                
            idf_table[ws["_id"]] = idf_table_tokens
            
        for ws in idf_table:
            table_entry = idf_table[ws]
            if ws not in document_vector:
                document_vector[ws] = [-1] * len(extracted_tokens)
                #this ensures order for token tfidf of document matrix is same as order of tokens in query
                for idx, qToken in enumerate(extracted_tokens): 
                    document_vector[ws][idx] = table_entry[qToken]["tfidf"]
            else:
                #this ensures order for token tfidf of document matrix is same as order of tokens in query
                for idx, qToken in enumerate(extracted_tokens): 
                    document_vector[ws][idx] = table_entry[qToken]["tfidf"]

        for qToken in tokenized_query:
            qToken_tf = len(qToken["occurrences"]) / len(tokenized_query)
            if qToken["token"] in token_idf:
                qToken_idf = token_idf[qToken["token"]]
                qToken_tf_idf = qToken_tf * qToken_idf
                query_vector.append(qToken_tf_idf)
        return {
            "document_vector": document_vector,
            "query_vector": query_vector
        }
    
    def _calc_cosine_similarity(self, document_vector, query_vector):
        cosine_similarity = {}

        for doc in document_vector:
            doc_vec_arr = np.array(document_vector[doc])
            query_vec_arr = np.array(query_vector)
            cosSim = np.dot(doc_vec_arr, query_vec_arr)
            cosine_similarity[doc] = cosSim

        return cosine_similarity
    
    def _get_query_websites(self, cosine_similarity):
        final_ws_score_list = [_id for _id in cosine_similarity]
        ws_for_query = website_collection.aggregate([
            {
                "$match":{
                    "_id": {
                        "$in": [ObjectId(_id) for _id in final_ws_score_list]
                    }
                }
            },
            {
                "$project":{
                    "_id": 1,
                    "url": 1,
                    "rank":1,
                }
            }
        ])
        ws_for_query_list = list(ws_for_query)
        return ws_for_query_list

    def _calc_weighted_sum_rank_score(self, ws_for_query_list, cosine_similarity):
        final_rank_score = {}
        COSINE_RANK_WT = 0.8
        PAGE_RANK_WT = 0.2

        for ws in ws_for_query_list:
            _id = str(ws["_id"])
            page_rank = ws["rank"]
            cosine_rank = cosine_similarity[_id]
            final_rank = COSINE_RANK_WT * cosine_rank + PAGE_RANK_WT * page_rank
            final_rank_score[_id] = final_rank
        
        return final_rank_score
    
    def _get_sorted_websites(self, final_rank_score, ws_for_query_list):
        sorted_websites = sorted(ws_for_query_list, key=lambda x: final_rank_score.get(str(x["_id"]), 0), reverse=True)
        for ws in sorted_websites:
            ws["_id"] = str(ws["_id"])
        return sorted_websites
        
    def get_rank_websites(self):
        tokenized_query = self._tokenize()
        extracted_tokens = self._extract_tokens(tokenized_query)
        vectors = self._calc_tf_idf(tokenized_query, extracted_tokens)
        cosine_similarity = self._calc_cosine_similarity(vectors["document_vector"], vectors["query_vector"])
        
        ws_for_query_list = self._get_query_websites(cosine_similarity)
        
        final_rank_score = self._calc_weighted_sum_rank_score(ws_for_query_list, cosine_similarity)
        
        sorted_websites = self._get_sorted_websites(final_rank_score, ws_for_query_list)

        return sorted_websites


    


        


