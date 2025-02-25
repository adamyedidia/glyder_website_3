from PIL import Image
import sys

def swap_red_blue(input_path, output_path):
    # Open the image
    img = Image.open(input_path)
    
    # Convert image to RGBA if it's not already
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Split the image into its RGBA channels
    r, g, b, a = img.split()
    
    # Convert to lists for pixel manipulation
    r_data = list(r.getdata())
    g_data = list(g.getdata())
    b_data = list(b.getdata())
    a_data = list(a.getdata())
    # Target colors
    # Blue: #0083bd (0, 131, 189)
    # Red:  #a31115 (163, 17, 21)
    
    # Create new channel data with adjusted values
    new_r = []
    new_g = []
    new_b = []
    new_a = []
    
    for r_val, g_val, b_val, a_val in zip(r_data, g_data, b_data, a_data):
        # Special case: if any two channels are 0, treat as grayscale
        if (r_val == 0 and g_val == 0 and b_val < 5) or (r_val == 0 and b_val == 0 and g_val < 5) or (g_val == 0 and b_val == 0 and r_val < 5):
            new_r.append(r_val)
            new_g.append(g_val)
            new_b.append(b_val)
            new_a.append(a_val)
            # print(new_r, new_g, new_b)
            continue
            
        # Check if the color is approximately grayscale
        # Get the maximum and minimum non-zero values
        values = [v for v in (r_val, g_val, b_val) if v > 0]

        if values:  # If there are non-zero values
            max_val = max(values)
            min_val = min(values)
            # print(max_val, min_val)
            # If the difference is within 5% of the larger value
            if min_val >= max_val * 0.85:
                new_r.append(r_val)
                new_g.append(g_val)
                new_b.append(b_val)
                new_a.append(a_val)
                # print("skipped")
                # print(new_r, new_g, new_b)
                continue
        
        # Process non-grayscale colors as before
        if r_val > b_val:  # Red is dominant, convert to blue
            brightness_factor = r_val / 163
            new_r.append(int(0 * brightness_factor))
            new_g.append(int(131 * brightness_factor))
            new_b.append(min(255, int(189 * brightness_factor)))
            new_a.append(a_val)
            # print(new_r, new_g, new_b)
        else:  # Blue is dominant, convert to red
            brightness_factor = b_val / 189
            new_r.append(min(255, int(163 * brightness_factor)))
            new_g.append(int(17 * brightness_factor))
            new_b.append(int(21 * brightness_factor))
            new_a.append(a_val)
            # print(new_r, new_g, new_b)

    # print(new_r, new_g, new_b)

    # Create new channel images
    new_r_channel = Image.new('L', img.size)
    new_g_channel = Image.new('L', img.size)
    new_b_channel = Image.new('L', img.size)
    new_a_channel = Image.new('L', img.size)
    new_r_channel.putdata(new_r)
    new_g_channel.putdata(new_g)
    new_b_channel.putdata(new_b)
    new_a_channel.putdata(new_a)
    
    # Create new image with modified channels
    swapped_img = Image.merge('RGBA', (new_r_channel, new_g_channel, new_b_channel, new_a_channel))
    
    # Save the result
    swapped_img.save(output_path, 'PNG')
    print(f"Successfully converted image and saved to {output_path}")


def main():
    if len(sys.argv) != 3:
        print("Usage: python script.py input_image.png output_image.png")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    swap_red_blue(input_path, output_path)

if __name__ == "__main__":
    main()