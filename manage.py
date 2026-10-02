#!/usr/bin/env python3
"""
Simple local development runner for the Wedding Invitation project.
Allows running: python manage.py runserver [port]
"""

import sys
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler

DEFAULT_PORT = 8000

def run_server(port=DEFAULT_PORT):
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    url = f"http://localhost:{port}/"
    print("=" * 60)
    print(f" 💍 Wedding Invitation Website Running!")
    print(f" 🌐 URL: {url}")
    print(f" Press Ctrl+C to stop the server.")
    print("=" * 60)
    
    # Automatically open the browser
    webbrowser.open(url)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server. Goodbye!")

if __name__ == '__main__':
    args = sys.argv[1:]
    port = DEFAULT_PORT

    if not args or args[0] == 'runserver':
        if len(args) > 1 and args[1].isdigit():
            port = int(args[1])
        run_server(port)
    else:
        print("Usage: python manage.py runserver [optional_port]")
        print("Example: python manage.py runserver")
