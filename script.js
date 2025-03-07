const dropZone = document.getElementById('dropZone');
const imageInput = document.getElementById('imageInput');
const originalImage = document.getElementById('originalImage');
const resultImage = document.getElementById('resultImage');
const removeBgBtn = document.getElementById('removeBgBtn');
const downloadBtn = document.getElementById('downloadBtn');

dropZone.addEventListener('click', () => imageInput.click());
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleFile(file);
});

function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
            originalImage.src = reader.result;
            removeBgBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }
}

removeBgBtn.addEventListener('click', async () => {
    // Placeholder for background removal logic
    // You could integrate an API like remove.bg or use a canvas-based solution
    const originalSrc = originalImage.src;
    
    // Simulate processing (replace with actual implementation)
    resultImage.src = originalSrc; // Placeholder: Update with real result
    downloadBtn.href = originalSrc; // Placeholder: Update with processed image
    downloadBtn.hidden = false;
});

// Example with remove.bg API (requires API key):

async function removeBackground() {
    const apiKey = 'YOUR_API_KEY';
    const formData = new FormData();
    formData.append('image_file', imageInput.files[0]);

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-Api-Key': apiKey },
        body: formData,
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    resultImage.src = url;
    downloadBtn.href = url;
    downloadBtn.hidden = false;
}
