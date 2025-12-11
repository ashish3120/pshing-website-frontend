from urllib.parse import urlparse
import re

PHISH_KEYWORDS = [
    "login", "logon", "signin", "verify", "verification", "update",
    "secure", "security", "account", "password", "bank", "payment",
    "confirm", "webscr", "billing", "credential"
]

BRAND_KEYWORDS = [
    "paypal", "apple", "google", "amazon", "microsoft", "netflix",
    "hdfc", "sbi", "icici", "facebook", "instagram"
]

def extract_features(url: str) -> dict:
    parsed = urlparse(url)
    domain = parsed.netloc
    path = parsed.path
    query = parsed.query
    full = url.lower()

    tld = domain.split(".")[-1] if "." in domain else ""
    suspicious_ext = (".html",".htm",".php",".asp",".aspx",".exe",".apk",".zip")

    tld_pop_map = {
        "com":100,"org":90,"net":85,"edu":80,"gov":75,
        "co":70,"in":65,"io":60,"info":30,"xyz":20
    }

    url_len = len(url)
    digits = sum(c.isdigit() for c in url)

    keyword_count = sum(full.count(k) for k in PHISH_KEYWORDS)
    suspicious_flag = int(any(k in full for k in PHISH_KEYWORDS))
    brand_flag = int(any(b in full for b in BRAND_KEYWORDS))

    return {
        "url_length": url_len,
        "has_ip_address": int(bool(re.match(r"(\d{1,3}\.){3}\d{1,3}", domain))),
        "dot_count": url.count("."),
        "https_flag": int(parsed.scheme == "https"),
        "url_entropy": (len(set(url)) / url_len) if url_len else 0,
        "token_count": url.count("/") + url.count("?") + url.count("&") + url.count("="),
        "subdomain_count": domain.count("."),
        "query_param_count": query.count("&") + query.count("="),
        "tld_length": len(tld),
        "path_length": len(path),
        "has_hyphen_in_domain": int("-" in domain),
        "number_of_digits": digits,
        "tld_popularity": tld_pop_map.get(tld, 10),
        "suspicious_file_extension": int(path.endswith(suspicious_ext)),
        "domain_name_length": len(domain),
        "percentage_numeric_chars": (digits/url_len*100) if url_len else 0,
        "keyword_count": keyword_count,
        "has_suspicious_keyword": suspicious_flag,
        "has_brand_keyword": brand_flag
    }
