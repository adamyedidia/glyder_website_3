import './App.css';
import Section, { Icon } from './Section';
import ConfigEditor from './ConfigEditor';
import { config as FortunateSonConfig } from './FortunateSon';
import { config as CircleOfWhispersConfig } from './CircleOfWhispers';
import { Typography, Button, TextField, Box, Card, CardContent } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveConfig, listConfigs, listPublicConfigs, loadConfig, deleteConfig, publishConfig, unpublishConfig } from './Network';
import { use } from 'react';

const configs = {
  'FortunateSon': FortunateSonConfig,
  'CircleOfWhispers': CircleOfWhispersConfig
}

function ConfigListView({ username, setUsername, savedConfigs, loadSavedConfigs, handleLoadConfig, publicConfigs }) {
  useEffect(() => {
    localStorage.setItem('script_editor_username', username);
  }, [username]);

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ mb: 3, outline: '2px solid black' }}>
        <CardContent>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={loadSavedConfigs}
            sx={{ mt: 1 }}
          >
            Reload Saved Scripts
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, outline: '2px solid black' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Your Scripts</Typography>
          <Typography variant="h6" gutterBottom>Careful, loading a script will clobber any unsaved changes.</Typography>
          {savedConfigs.length === 0 ? (
            <Typography color="textSecondary">No saved scripts found</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '600px' }}>
              {savedConfigs.map(({ name: configName, public: isPublic }, index) => (
                <Card key={index} variant="outlined">
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>{configName}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleLoadConfig(configName)}
                      >
                        Load
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => (isPublic ? unpublishConfig(configName, username) : publishConfig(configName, username))
                          .then(() => {
                            loadSavedConfigs();
                          })}
                        sx={{ minWidth: '140px' }}
                      >
                        {isPublic ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          deleteConfig(configName, username)
                            .then(() => {
                              loadSavedConfigs();
                            })
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      <Card sx={{ outline: '2px solid black' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Public Scripts</Typography>
          {publicConfigs.length === 0 ? (
            <Typography color="textSecondary">No public scripts found</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '600px' }}>
              {publicConfigs.map(({ name: configName, by }, index) => (
                <Card key={index} variant="outlined">
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>{configName} by {by}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleLoadConfig(configName)}
                      >
                        Load
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
function App() {
  const [config, setConfig] = useState(() => {
    return configs[localStorage.getItem('selectedConfig')] || configs['FortunateSon'];
  });
  const [showConfigSelect, setShowConfigSelect] = useState(false);
  const [currentView, setCurrentView] = useState('characters');
  const [username, setUsername] = useState(localStorage.getItem('script_editor_username') || '');
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [publicConfigs, setPublicConfigs] = useState([]);

  const charactersRef = useRef(null);
  const nightOrderRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('botc');

    return () => {
      document.body.classList.remove('botc');
    };
  }, []);

  const loadSavedConfigs = () => {
    if (username) {
      listConfigs(username)
        .then(configs => {
          setSavedConfigs(configs);
        })
        .catch(err => {
          console.error('Failed to load configs:', err);
        });
    }
    listPublicConfigs()
      .then(configs => {
        setPublicConfigs(configs);
      })
      .catch(err => {
        console.error('Failed to load public configs:', err);
      });
  };

  useEffect(() => {
    loadSavedConfigs();
  }, []);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem('script_editor_username', newUsername);
  };

  let { townsfolk, outsiders, minions, demons, setupText, highlightedCharacters, header, firstNightOrder, otherNightOrder, icons } = config;

  // const handleDownloadCharactersPDF = async () => {
  //   // Create new PDF
  //   const pdf = new jsPDF('portrait', 'pt', 'a4');
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();
  //   const margin = 40;
  //   const scriptName = localStorage.getItem('selectedConfig') || 'CircleOfWhispers';

  //   if (charactersRef.current) {
  //     // Get element dimensions
  //     const element = charactersRef.current;
  //     const elementWidth = element.offsetWidth;
  //     const elementHeight = element.offsetHeight;

  //     // Calculate scale to fit width while maintaining aspect ratio
  //     const scale = (pdfWidth - (margin * 2)) / elementWidth;

  //     const charactersCanvas = await html2canvas(element, {
  //       scale: scale * 2, // Multiply by 2 for better quality
  //       logging: false,
  //       useCORS: true,
  //       width: elementWidth,
  //       height: elementHeight,
  //       windowWidth: elementWidth,
  //       windowHeight: elementHeight
  //     });

  //     // Use full width minus margins
  //     const imgWidth = pdfWidth - (margin * 2);
  //     const imgHeight = (elementHeight * imgWidth) / elementWidth;

  //     // Check if height exceeds page and scale down if needed
  //     const maxHeight = pdfHeight - (margin * 2);
  //     const finalWidth = imgHeight > maxHeight ? (imgWidth * maxHeight / imgHeight) : imgWidth;
  //     const finalHeight = imgHeight > maxHeight ? maxHeight : imgHeight;

  //     // Add character image to PDF
  //     const charactersImgData = charactersCanvas.toDataURL('image/png');
  //     pdf.addImage(charactersImgData, 'PNG', margin, margin + 20, finalWidth, finalHeight);
  //   }

  //   // Save the PDF
  //   pdf.save(`botc-${scriptName.toLowerCase().replace(/\s+/g, '-')}-characters.pdf`);
  // };

  // const handleDownloadNightOrderPDF = async () => {
  //   // Create new PDF
  //   const pdf = new jsPDF('portrait', 'pt', 'a4');
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();
  //   const margin = 40;
  //   const scriptName = localStorage.getItem('selectedConfig') || 'CircleOfWhispers';

  //   // Set PDF title
  //   pdf.setFontSize(16);
  //   pdf.text(`Night Order: ${scriptName.replace(/([A-Z])/g, ' $1').trim()}`, margin, margin);
  //   pdf.setFontSize(12);

  //   if (nightOrderRef.current) {
  //     const nightOrderCanvas = await html2canvas(nightOrderRef.current, {
  //       scale: 1.5,
  //       logging: false,
  //       useCORS: true,
  //       backgroundColor: null
  //     });

  //     // Calculate scale to fit on page with margins
  //     const imgWidth = pdfWidth - (margin * 2);
  //     const imgHeight = (nightOrderCanvas.height * imgWidth) / nightOrderCanvas.width;

  //     // Add night order to PDF
  //     const nightOrderImgData = nightOrderCanvas.toDataURL('image/png');
  //     pdf.addImage(nightOrderImgData, 'PNG', margin, margin + 20, imgWidth, imgHeight);
  //   }

  //   // Save the PDF
  //   pdf.save(`botc-${scriptName.toLowerCase().replace(/\s+/g, '-')}-night-order.pdf`);
  // };

  function handleLoadConfig(configName) {
    loadConfig(configName, username)
      .then(config => {
        setConfig(config);
        localStorage.setItem('selectedConfig', configName);
      })
      .catch(err => {
        console.error('Failed to load config:', err);
      });
  }

  function CharactersView() {
    const handlePrint = () => {
      const element = charactersRef.current;
      if (!element) return;

      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const contentWidth = pdfWidth - (margin * 2);

      html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const scale = Math.min(1, (pdfHeight - margin * 2) / imgHeight);

        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        const xPos = margin + (contentWidth - scaledWidth) / 2;
        // const yPos = margin + (pdfHeight - margin * 2 - scaledHeight) / 2;
        const yPos = margin;

        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', xPos, yPos, scaledWidth, scaledHeight);

        const scriptName = config.name || 'script';
        pdf.save(`botc-${scriptName.toLowerCase().replace(/\s+/g, '-')}-characters.pdf`);
      });
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            sx={{ fontWeight: '500' }}
          >
            Save as PDF
          </Button>
        </div>
        <div ref={charactersRef}>
          {header && <Typography variant="h6" sx={{ marginBottom: '20px', textAlign: 'center', width: '1070px' }} whiteSpace="pre-wrap">{header}</Typography>}
          <Section name="Townsfolk" characters={townsfolk.map(([name, description]) => ({ name, description }))} setupText={setupText} highlightedCharacters={highlightedCharacters} icons={icons} />
          <Section name="Outsiders" characters={outsiders.map(([name, description]) => ({ name, description }))} setupText={setupText} highlightedCharacters={highlightedCharacters} icons={icons} />
          <Section name="Minions" characters={minions.map(([name, description]) => ({ name, description }))} setupText={setupText} highlightedCharacters={highlightedCharacters} icons={icons} />
          <Section name="Demons" characters={demons.map(([name, description]) => ({ name, description }))} setupText={setupText} highlightedCharacters={highlightedCharacters} icons={icons} />
        </div>
      </div>
    );
  }

  const NightOrderView = () => {
    const handlePrint = () => {
      const element = nightOrderRef.current;
      if (!element) return;

      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const contentWidth = pdfWidth - (margin * 2);

      html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const scale = Math.min(1, (pdfHeight - margin * 2) / imgHeight);

        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        const xPos = margin + (contentWidth - scaledWidth) / 2;
        // const yPos = margin + (pdfHeight - margin * 2 - scaledHeight) / 2;
        const yPos = margin;

        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', xPos, yPos, scaledWidth, scaledHeight);

        const scriptName = config.name || 'script';
        pdf.save(`botc-${scriptName.toLowerCase().replace(/\s+/g, '-')}-night-order.pdf`);
      });
    };

    const getCharacterInfo = (roleName) => {
      if (roleName === 'Evil wakes up' || roleName === 'Demon bluffs') {
        return { name: roleName, description: '' };
      }

      const allCharacters = [
        ...townsfolk,
        ...outsiders,
        ...minions,
        ...demons
      ];

      return {
        name: roleName,
        description: allCharacters.find(([name, description]) => name === roleName)?.[1] || ''
      };
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            sx={{ fontWeight: '500' }}
          >
            Save as PDF
          </Button>
        </div>

        <div ref={nightOrderRef} style={{ width: '100%', width: '1070px' }}>
          <div>
            <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>First Night</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {firstNightOrder.map((role, index) => {
                const { name, description } = getCharacterInfo(role);
                return (
                  <div key={index} style={{
                    padding: '4px 16px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ minWidth: '30px', fontWeight: 'bold', color: '#666' }}>{index + 1}.</span>
                    <Icon name={icons[`${name}-night`] || name} section="night" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontWeight: 'bold' }}>{name}</span>
                      {description && <span style={{ fontSize: '0.9em', color: '#666' }}>{description}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', marginTop: '40px' }}>Other Nights</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {otherNightOrder.map((role, index) => {
                const { name, description } = getCharacterInfo(role);
                return (
                  <div key={index} style={{
                    padding: '8px 16px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ minWidth: '30px', fontWeight: 'bold', color: '#666' }}>{index + 1}.</span>
                    <Icon name={icons[`${name}-night`] || name} section="night" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontWeight: 'bold' }}>{name}</span>
                      {description && <span style={{ fontSize: '0.9em', color: '#666' }}>{description}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ViewSelector = () => (
    <div style={{
      display: 'flex',
      gap: '10px',
      padding: '10px',
      // backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '20px',
      // width: 'fit-content',
      // margin: '0 auto 20px auto'
    }}>
      {['characters', 'nightOrder', 'scriptEditor', 'account'].map(view => (
        <Button
          key={view}
          onClick={() => setCurrentView(view)}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: currentView === view ? '#4a90e2' : 'white',
            color: currentView === view ? 'white' : '#333',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {view.charAt(0).toUpperCase() + view.slice(1).replace(/([A-Z])/g, ' $1')}
        </Button>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', alignItems: 'flex-start', marginLeft: '30px', marginRight: '30px' }}>
      <ViewSelector />
      {showConfigSelect && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minWidth: '250px'
        }}>
          <h2 style={{ margin: '0 0 16px 0', textAlign: 'center', color: '#333' }}>Select Script</h2>
          {Object.entries(configs).map(([key, scriptConfig]) => (
            <button
              key={key}
              onClick={() => {
                setConfig(scriptConfig);
                localStorage.setItem('selectedConfig', key);
                setShowConfigSelect(false);
              }}
              style={{
                padding: '12px 20px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: config === scriptConfig ? '#4a90e2' : '#f0f0f0',
                color: config === scriptConfig ? 'white' : '#333',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '16px',
                fontWeight: '500',
                ':hover': {
                  backgroundColor: config === scriptConfig ? '#357abd' : '#e4e4e4'
                }
              }}
            >
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
      )}

      {currentView === 'account' && <ConfigListView username={username} setUsername={setUsername} setConfig={setConfig} savedConfigs={savedConfigs} loadSavedConfigs={loadSavedConfigs} handleLoadConfig={handleLoadConfig} publicConfigs={publicConfigs} />}
      {currentView === 'characters' && <CharactersView />}
      {currentView === 'nightOrder' && <NightOrderView />}
      {currentView === 'scriptEditor' && <ConfigEditor config={config} setConfig={setConfig} saveConfig={saveConfig} username={username} />}
    </div>
  );
}

export default App;