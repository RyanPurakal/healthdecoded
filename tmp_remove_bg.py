from PIL import Image
import sys

def remove_bg(file_path):
    print(f"Processing {file_path}...")
    try:
        img = Image.open(file_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        # We sample the top-left pixel to find the background color
        bg_color = pixels[0, 0]
        
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                r_diff = abs(r - bg_color[0])
                g_diff = abs(g - bg_color[1])
                b_diff = abs(b - bg_color[2])
                dist = r_diff + g_diff + b_diff
                
                # If exact or very close to background color, make fully transparent
                if dist < 15:
                    pixels[x, y] = (r, g, b, 0)
                # Anti-aliasing soft edge for pixels blending into the background
                elif dist < 80:
                    alpha = int(((dist - 15) / 65.0) * 255)
                    pixels[x, y] = (r, g, b, alpha)

        img.save(file_path, "PNG")
        print(f"Success: {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    remove_bg("public/logo192.png")
    remove_bg("public/logo512.png")
