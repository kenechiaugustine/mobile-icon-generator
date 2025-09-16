import React, { useState, useRef } from 'react';
import { Download, Upload, Smartphone, Settings, Info, Check } from 'lucide-react';

const IconGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [generatedIcons, setGeneratedIcons] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Icon sizes for different platforms
  const iconSizes = {
    ios: [
      { size: 20, scale: 1, name: 'Icon-20.png' },
      { size: 20, scale: 2, name: 'Icon-20@2x.png' },
      { size: 20, scale: 3, name: 'Icon-20@3x.png' },
      { size: 29, scale: 1, name: 'Icon-29.png' },
      { size: 29, scale: 2, name: 'Icon-29@2x.png' },
      { size: 29, scale: 3, name: 'Icon-29@3x.png' },
      { size: 40, scale: 1, name: 'Icon-40.png' },
      { size: 40, scale: 2, name: 'Icon-40@2x.png' },
      { size: 40, scale: 3, name: 'Icon-40@3x.png' },
      { size: 60, scale: 2, name: 'Icon-60@2x.png' },
      { size: 60, scale: 3, name: 'Icon-60@3x.png' },
      { size: 76, scale: 1, name: 'Icon-76.png' },
      { size: 76, scale: 2, name: 'Icon-76@2x.png' },
      { size: 83.5, scale: 2, name: 'Icon-83.5@2x.png' },
      { size: 1024, scale: 1, name: 'Icon-1024.png' }
    ],
    android: [
      { size: 36, density: 'ldpi', name: 'ic_launcher.png', folder: 'mipmap-ldpi' },
      { size: 48, density: 'mdpi', name: 'ic_launcher.png', folder: 'mipmap-mdpi' },
      { size: 72, density: 'hdpi', name: 'ic_launcher.png', folder: 'mipmap-hdpi' },
      { size: 96, density: 'xhdpi', name: 'ic_launcher.png', folder: 'mipmap-xhdpi' },
      { size: 144, density: 'xxhdpi', name: 'ic_launcher.png', folder: 'mipmap-xxhdpi' },
      { size: 192, density: 'xxxhdpi', name: 'ic_launcher.png', folder: 'mipmap-xxxhdpi' },
      { size: 512, density: 'playstore', name: 'ic_launcher-playstore.png', folder: 'playstore' }
    ]
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(file);
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = (img, size) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const actualSize = Math.round(size);
    
    canvas.width = actualSize;
    canvas.height = actualSize;
    
    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.drawImage(img, 0, 0, actualSize, actualSize);
    return canvas.toDataURL('image/png');
  };

  const generateIcons = () => {
    if (!imageUrl) return;
    
    setIsGenerating(true);
    const img = new Image();
    
    img.onload = () => {
      const allIcons = [];
      
      // Generate iOS icons
      iconSizes.ios.forEach(icon => {
        const actualSize = icon.scale ? icon.size * icon.scale : icon.size;
        const dataUrl = resizeImage(img, actualSize);
        allIcons.push({
          platform: 'iOS',
          name: icon.name,
          size: `${actualSize}x${actualSize}`,
          dataUrl,
          folder: 'ios'
        });
      });
      
      // Generate Android icons
      iconSizes.android.forEach(icon => {
        const dataUrl = resizeImage(img, icon.size);
        allIcons.push({
          platform: 'Android',
          name: icon.name,
          size: `${icon.size}x${icon.size}`,
          density: icon.density,
          dataUrl,
          folder: icon.folder
        });
      });
      
      setGeneratedIcons(allIcons);
      setIsGenerating(false);
    };
    
    img.src = imageUrl;
  };

  const downloadIcon = (icon) => {
    const link = document.createElement('a');
    link.download = icon.name;
    link.href = icon.dataUrl;
    link.click();
  };

  const downloadAll = () => {
    generatedIcons.forEach((icon, index) => {
      setTimeout(() => {
        downloadIcon(icon);
      }, index * 100); // Small delay between downloads
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0,
      marginLeft: '12px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.125rem',
      margin: 0
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '32px'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center'
    },
    uploadArea: {
      border: '2px dashed #d1d5db',
      borderRadius: '8px',
      padding: '32px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'border-color 0.3s ease',
      ':hover': {
        borderColor: '#6366f1'
      }
    },
    hiddenInput: {
      display: 'none'
    },
    uploadedImage: {
      width: '128px',
      height: '128px',
      objectFit: 'cover',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      margin: '0 auto 16px'
    },
    button: {
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    },
    primaryButton: {
      backgroundColor: '#6366f1',
      color: 'white',
      ':hover': {
        backgroundColor: '#5855eb'
      }
    },
    secondaryButton: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    successButton: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    downloadButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    generateButton: {
      margin: '24px auto 0',
      display: 'flex',
      fontSize: '1rem',
      padding: '12px 32px'
    },
    resultsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    iconGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '16px',
      marginBottom: '32px'
    },
    iconCard: {
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      transition: 'background-color 0.3s ease',
      border: '1px solid #e5e7eb'
    },
    iconImage: {
      width: '64px',
      height: '64px',
      margin: '0 auto 8px',
      borderRadius: '6px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    iconName: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#1f2937',
      margin: '0 0 4px 0'
    },
    iconSize: {
      fontSize: '0.75rem',
      color: '#6b7280',
      margin: '0 0 8px 0'
    },
    downloadIconButton: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
      padding: '6px 12px',
      fontSize: '0.75rem',
      border: '1px solid #d1d5db'
    },
    sectionDivider: {
      borderBottom: '2px solid #e5e7eb',
      paddingBottom: '8px',
      marginBottom: '16px'
    },
    instructionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    codeBlock: {
      backgroundColor: '#f3f4f6',
      padding: '8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontFamily: 'monospace',
      margin: '8px 0',
      display: 'block',
      overflowX: 'auto'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid #ffffff',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '8px'
    }
  };

  // Add CSS animation for spinner
  const spinnerStyle = document.createElement('style');
  spinnerStyle.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinnerStyle);

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <Smartphone color="#6366f1" size={40} />
            <h1 style={styles.title}>React Native Icon Generator</h1>
          </div>
          <p style={styles.subtitle}>Generate app icons for iOS and Android from a single image</p>
        </div>

        {/* Upload Section */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>
            <Upload style={{ marginRight: '8px' }} size={24} />
            Upload Your Icon
          </h2>
          
          <div 
            style={styles.uploadArea}
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={(e) => e.target.style.borderColor = '#6366f1'}
            onMouseLeave={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={styles.hiddenInput}
            />
            
            {imageUrl ? (
              <div>
                <img 
                  src={imageUrl} 
                  alt="Selected icon" 
                  style={styles.uploadedImage}
                />
                <p style={{ color: '#6b7280', margin: '0 0 16px 0' }}>{selectedImage?.name}</p>
                <button
                  style={{...styles.button, ...styles.secondaryButton}}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div>
                <Upload style={{ margin: '0 auto 16px', color: '#9ca3af' }} size={48} />
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>Click to upload your app icon</p>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Recommended: 1024x1024 PNG with transparent background</p>
                </div>
                <button
                  style={{...styles.button, ...styles.primaryButton}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#5855eb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
                >
                  Choose File
                </button>
              </div>
            )}
          </div>

          {imageUrl && (
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={generateIcons}
                disabled={isGenerating}
                style={{
                  ...styles.button, 
                  ...styles.successButton, 
                  ...styles.generateButton,
                  opacity: isGenerating ? 0.5 : 1,
                  cursor: isGenerating ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => !isGenerating && (e.target.style.backgroundColor = '#059669')}
                onMouseLeave={(e) => !isGenerating && (e.target.style.backgroundColor = '#10b981')}
              >
                {isGenerating ? (
                  <>
                    <div style={styles.spinner}></div>
                    Generating Icons...
                  </>
                ) : (
                  <>
                    <Settings size={20} />
                    Generate All Icons
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        {generatedIcons.length > 0 && (
          <div style={styles.card}>
            <div style={styles.resultsHeader}>
              <h2 style={{...styles.sectionTitle, margin: 0}}>
                <Check style={{ marginRight: '8px', color: '#10b981' }} size={24} />
                Generated Icons ({generatedIcons.length})
              </h2>
              <button
                onClick={downloadAll}
                style={{...styles.button, ...styles.downloadButton}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                <Download size={18} />
                Download All
              </button>
            </div>

            {/* iOS Icons */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{...styles.sectionTitle, ...styles.sectionDivider, fontSize: '1.25rem'}}>
                iOS Icons ({iconSizes.ios.length})
              </h3>
              <div style={styles.iconGrid}>
                {generatedIcons.filter(icon => icon.platform === 'iOS').map((icon, index) => (
                  <div 
                    key={index} 
                    style={styles.iconCard}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  >
                    <img 
                      src={icon.dataUrl} 
                      alt={icon.name} 
                      style={styles.iconImage}
                    />
                    <p style={styles.iconName}>{icon.name}</p>
                    <p style={styles.iconSize}>{icon.size}</p>
                    <button
                      onClick={() => downloadIcon(icon)}
                      style={{...styles.button, ...styles.downloadIconButton}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Android Icons */}
            <div>
              <h3 style={{...styles.sectionTitle, ...styles.sectionDivider, fontSize: '1.25rem'}}>
                Android Icons ({iconSizes.android.length})
              </h3>
              <div style={styles.iconGrid}>
                {generatedIcons.filter(icon => icon.platform === 'Android').map((icon, index) => (
                  <div 
                    key={index} 
                    style={styles.iconCard}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  >
                    <img 
                      src={icon.dataUrl} 
                      alt={icon.name} 
                      style={styles.iconImage}
                    />
                    <p style={styles.iconName}>{icon.folder}</p>
                    <p style={styles.iconSize}>{icon.size}</p>
                    <p style={{...styles.iconSize, marginBottom: '8px'}}>{icon.density}</p>
                    <button
                      onClick={() => downloadIcon(icon)}
                      style={{...styles.button, ...styles.downloadIconButton}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>
            <Info style={{ marginRight: '8px', color: '#3b82f6' }} size={24} />
            Instructions
          </h3>
          
          <div style={styles.instructionsGrid}>
            <div>
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>For iOS:</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}>
                Place the generated icons in your iOS project at:
              </p>
              <code style={styles.codeBlock}>
                ios/YourApp/Images.xcassets/AppIcon.appiconset/
              </code>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '8px 0 0 0' }}>
                Make sure to update the Contents.json file accordingly.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>For Android:</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}>
                Place the icons in their respective folders:
              </p>
              <code style={styles.codeBlock}>
                android/app/src/main/res/[folder-name]/
              </code>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '8px 0 0 0' }}>
                Each icon goes into its corresponding mipmap folder (e.g., mipmap-hdpi, mipmap-xhdpi).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconGenerator;