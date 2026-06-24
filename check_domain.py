import socket
import sys

domains = [
    "safeholiday.kz",
    "safe-holiday.kz",
    "localbridge.kz",
    "safeholiday.com",
    "safe-holiday.com"
]

def check_domain(domain):
    try:
        socket.gethostbyname(domain)
        return f"[TAKEN] {domain} is already registered/active."
    except socket.gaierror:
        return f"[AVAILABLE?] {domain} might be available (no A record found)."

if __name__ == "__main__":
    print("Checking domain availability (DNS heuristic)...\n")
    for d in domains:
        print(check_domain(d))
