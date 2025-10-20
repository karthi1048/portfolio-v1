// Vite Specific import way
// Dynamically import assets from folders & return a map of filenames to URLs

const SVGs = import.meta.glob('../assets/svg/*.svg', { eager: true });
const images = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,webp}', { eager: true });

// In this object, keys are file paths & values are functions that would dynamically import each file
// default as the URL path
const svgMap = Object.entries(SVGs).reduce((acc, [path, module]) => {
    const fileName = path.split('/').pop().replace('.svg', '');
    acc[fileName] = module.default;
    return acc;
}, {});

const imageMap = Object.entries(images).reduce((acc, [path, module]) => {
    // const fileName = path.split('/').pop().replace('/\.(png|jpg|jpeg|webp)$/', '');         // Removes extension
    const fileName = path.split('/').pop();                                                    // Leaves extension
    acc[fileName] = module.default;
    return acc;
}, {});

export { svgMap, imageMap };