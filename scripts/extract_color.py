import struct
import binascii

def get_hex_color(image_path):
    with open(image_path, 'rb') as f:
        # Skip PNG header
        f.seek(16)
        # Identify width/height (not needed for rough center sampling but good to know we have a png)
        # Just grab some bytes from the middle-ish of the data stream or just analyze raw bytes for dominant color if uncompressed?
        # PNG is compressed. We can't easily read raw pixels without PIL/Pillow which might not be installed.
        pass

# Since we can't guarantee PIL is installed, let's try a simpler approach if the user environment is restricted.
# actually, macos usually has python but maybe not Pillow.
# Let's try to just use a simple heuristic or if I can't read it, I'll just ask the user or guess.
# WAIT, I can use sips (macOS image tool) to get properties? No, sips doesn't give dominant color easily.
# I will try to use a simple hex dump and look for patterns? No that's hard with compression.

# Alternative: I'll assume the user wants me to use the color they showed.
# Looking at the message "use this colour for the", checking the image...
# I can try to use 'screencapture' or something? No.

# Let's try to verify if PIL is installed.
try:
    from PIL import Image
    im = Image.open("/Users/ravitejapulligella/.gemini/antigravity/brain/e0a5fcfb-51c1-4def-bd20-22da50984d84/uploaded_media_1769774478983.png")
    # Get a pixel from the center
    width, height = im.size
    r, g, b = im.getpixel((width//2, height//2))[:3]
    print(f"#{r:02x}{g:02x}{b:02x}")
except ImportError:
    print("PIL not installed")
