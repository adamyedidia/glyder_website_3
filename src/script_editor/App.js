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

const configs = {
  'FortunateSon': FortunateSonConfig,
  'CircleOfWhispers': CircleOfWhispersConfig
}

function ConfigListView({ username, setUsername, savedConfigs, loadSavedConfigs, handleLoadConfig, publicConfigs }) {
  useEffect(() => {
    localStorage.setItem('script_editor_username', username);
  }, [username]);

  return (
    <Box sx={{ p: 2, maxWidth: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
      <Card sx={{ mb: 3, outline: '2px solid black', minWidth: { xs: '100%', sm: 'auto' } }}>
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
            Reload Scripts
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, outline: '2px solid black', minWidth: { xs: '100%', sm: 'auto' } }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Your Scripts</Typography>
          <Typography variant="h6" gutterBottom>Careful, loading a script will clobber any unsaved changes.</Typography>
          {savedConfigs.length === 0 ? (
            <Typography color="textSecondary">No saved scripts found</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              {savedConfigs.map(({ name: configName, public: isPublic }, index) => (
                <Card key={index} variant="outlined">
                  <CardContent sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'stretch', sm: 'center' },
                    gap: 2
                  }}>
                    <Typography sx={{ wordBreak: 'break-word' }}>{configName}</Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 1,
                      width: { xs: '100%', sm: 'auto' }
                    }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleLoadConfig(configName)}
                        fullWidth
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
                        fullWidth
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
                        fullWidth
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

      <Card sx={{ outline: '2px solid black', minWidth: { xs: '100%', sm: 'auto' } }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Public Scripts</Typography>
          {publicConfigs.length === 0 ? (
            <Typography color="textSecondary">No public scripts found</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              {publicConfigs.map(({ name: configName, by }, index) => (
                <Card key={index} variant="outlined">
                  <CardContent sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'stretch', sm: 'center' },
                    gap: 2
                  }}>
                    <Typography sx={{ wordBreak: 'break-word' }}>{configName} by {by}</Typography>
                    <Box sx={{ 
                      display: 'flex',
                      width: { xs: '100%', sm: 'auto' }
                    }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleLoadConfig(configName, by)}
                        fullWidth
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
  const [currentView, setCurrentView] = useState('characters');
  const [username, setUsername] = useState(localStorage.getItem('script_editor_username') || '');
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [publicConfigs, setPublicConfigs] = useState([]);

  const charactersRef = useRef(null);
  const nightOrderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    document.body.classList.add('botc');

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      document.body.classList.remove('botc');
      window.removeEventListener('resize', handleResize);
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

  let { townsfolk, outsiders, minions, demons, setupText, highlightedCharacters, header, firstNightOrder, otherNightOrder, icons } = config;

  function handleLoadConfig(configName, by = username) {
    loadConfig(configName, by)
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
        const yPos = margin;

        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', xPos, yPos, scaledWidth, scaledHeight);

        const scriptName = config.name || 'script';
        pdf.save(`botc-${scriptName.toLowerCase().replace(/\s+/g, '-')}-characters.pdf`);
      });
    };

    return (
      <div style={{ width: '100%', maxWidth: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
        {!isMobile && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            sx={{ fontWeight: '500' }}
          >
            Save as PDF
          </Button>
        </div>}
        <div ref={charactersRef} style={{ width: '100%', maxWidth: '100%', minWidth: { xs: '600px', sm: 'auto' } }}>
          {header && (
            <Typography 
              variant="h6" 
              sx={{ 
                marginBottom: '20px', 
                textAlign: 'center', 
                width: '100%', 
                maxWidth: '100%',
              }} 
              whiteSpace="pre-wrap"
            >
              {header}
            </Typography>
          )}
          <Section name="Townsfolk" characters={townsfolk.map(([name, description]) => ({ name, description }))} setupText={setupText} highlightedCharacters={highlightedCharacters} icons={icons} isMobile={isMobile} />
          <Section name="Outsiders" characters={outsiders.map(([name, description]) => ({ name, description }))} setupText={setupText} highlightedCharacters={highlightedCharacters} icons={icons} isMobile={isMobile} />
          <Section name="Minions" characters={minions.map(([name, description]) => ({ name, description }))} setupText={setupText} highlightedCharacters={highlightedCharacters} icons={icons} isMobile={isMobile} />
          <Section name="Demons" characters={demons.map(([name, description]) => ({ name, description }))} setupText={setupText} highlightedCharacters={highlightedCharacters} icons={icons} isMobile={isMobile} />
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
      <div style={{ width: '100%', maxWidth: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
        {!isMobile && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            sx={{ fontWeight: '500' }}
          >
            Save as PDF
          </Button>
        </div>}

        <div ref={nightOrderRef} style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', minWidth: { xs: '600px', sm: 'auto' } }}>
          <div>
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>First Night</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {firstNightOrder.map((role, index) => {
                const { name, description } = getCharacterInfo(role);
                return (
                  <div key={index} style={{
                    padding: '4px 16px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '12px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      marginBottom: isMobile ? '4px' : '0'
                    }}>
                      <span style={{ minWidth: '30px', fontWeight: 'bold', color: '#666' }}>{index + 1}.</span>
                      <Icon name={icons[`${name}-night`] || name} section="night" />
                      <span style={{ fontWeight: 'bold' }}>{name}</span>
                    </div>
                    {description && (
                      <div style={{ 
                        fontSize: '0.9em', 
                        color: '#666',
                        // paddingLeft: isMobile ? '45px' : '0',
                        width: '100%',
                        wordWrap: 'break-word'
                      }}>
                        {description}
                      </div>
                    )}
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
                    alignItems: isMobile ? 'flex-start' : 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '12px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      marginBottom: isMobile ? '4px' : '0'
                    }}>
                      <span style={{ minWidth: '30px', fontWeight: 'bold', color: '#666' }}>{index + 1}.</span>
                      <Icon name={icons[`${name}-night`] || name} section="night" />
                      <span style={{ fontWeight: 'bold' }}>{name}</span>
                    </div>
                    {description && (
                      <div style={{ 
                        fontSize: '0.9em', 
                        color: '#666',
                        // paddingLeft: isMobile ? '45px' : '0',
                        width: '100%',
                        wordWrap: 'break-word'
                      }}>
                        {description}
                      </div>
                    )}
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
      flexDirection: isMobile ? 'column' : 'row',
      gap: '10px',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '20px',
      width: '100%'
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
            fontWeight: '500',
            flex: isMobile ? '1' : 'initial'
          }}
        >
          {view.charAt(0).toUpperCase() + view.slice(1).replace(/([A-Z])/g, ' $1')}
        </Button>
      ))}
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      marginTop: '20px', 
      alignItems: 'flex-start', 
      padding: '0 15px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflowX: 'auto',
      overflowY: 'hidden',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1070px',
        minWidth: { xs: '600px', sm: 'auto' }
      }}>
        <ViewSelector />
      </div>
      <div style={{ width: '100%', maxWidth: '1070px', marginBottom: '50px', minWidth: { xs: '600px', sm: 'auto' } }}>
        {currentView === 'account' && <ConfigListView username={username} setUsername={setUsername} setConfig={setConfig} savedConfigs={savedConfigs} loadSavedConfigs={loadSavedConfigs} handleLoadConfig={handleLoadConfig} publicConfigs={publicConfigs} />}
        {currentView === 'characters' && <CharactersView />}
        {currentView === 'nightOrder' && <NightOrderView />}
        {currentView === 'scriptEditor' && <ConfigEditor config={config} setConfig={setConfig} saveConfig={saveConfig} username={username} />}
      </div>
    </div>
  );
}
export default App;