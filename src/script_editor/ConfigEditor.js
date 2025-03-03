import React, { useState, useEffect } from 'react';
import { emptyConfig } from './Config';
import { Characters } from './BotcCharacters';
import {
    Box,
    Typography,
    Container,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    TextField,
    IconButton,
    Card,
    CardContent,
    CardActions,
    Chip,
    Stack,
    Switch,
    FormControlLabel,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Autocomplete
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Close as CloseIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    Star as StarIcon
} from '@mui/icons-material';

const ConfigEditor = ({ config, setConfig, saveConfig, username, showToast }) => {
    const theme = useTheme();
    const [editingSection, setEditingSection] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [newItemName, setNewItemName] = useState("");
    const [newItemValue, setNewItemValue] = useState("");
    const [newSetupText, setNewSetupText] = useState("");
    const [newIconName, setNewIconName] = useState("");
    const [editingHeader, setEditingHeader] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [headerText, setHeaderText] = useState(config.header || "");
    const [nameText, setNameText] = useState(config.name || "");
    const [expandedSections, setExpandedSections] = useState({
        townsfolk: false,
        outsiders: false,
        minions: false,
        demons: false,
        firstNightOrder: false,
        otherNightOrder: false
    });
    const [newConfigDialogOpen, setNewConfigDialogOpen] = useState(false);
    const [addFromExisting, setAddFromExisting] = useState(false);

    const nameFieldRef = React.useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (editingItem || editingSection || editingHeader) {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    if (editingItem) {
                        const [section, name] = editingItem.split('-');
                        if (section === 'firstNightOrder' || section === 'otherNightOrder') {
                            updateOrderItem(section, name, newItemName, newIconName);
                        } else {
                            updateCharacter(section, name, newItemValue, newSetupText, newIconName, newItemName);
                        }
                    } else if (editingSection) {
                        if (editingSection === 'firstNightOrder' || editingSection === 'otherNightOrder') {
                            addToOrder(editingSection, newItemName);
                        } else {
                            addCharacter(editingSection);
                        }
                    } else if (editingHeader) {
                        saveHeader();
                    } else if (editingName) {
                        saveName();
                    }
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    if (editingItem) {
                        setEditingItem(null);
                    } else if (editingSection) {
                        setEditingSection(null);
                        setAddFromExisting(false);
                    } else if (editingHeader) {
                        setEditingHeader(false);
                    } else if (editingName) {
                        setEditingName(false);
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [editingItem, editingSection, editingHeader, newItemName, newItemValue, newSetupText, newIconName, headerText, nameText, addFromExisting]);

    // Add autofocus effect
    useEffect(() => {
        if (editingItem || editingSection) {
            nameFieldRef.current?.focus();
        }
    }, [editingItem, editingSection]);

    const handleNewConfig = () => {
        setNewConfigDialogOpen(true);
    };

    const handleConfirmNewConfig = () => {
        setConfig(emptyConfig);
        setNewConfigDialogOpen(false);
    };

    const handleCancelNewConfig = () => {
        setNewConfigDialogOpen(false);
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const toggleHighlighted = (characterName) => {
        setConfig(prev => {
            const highlighted = prev.highlightedCharacters || [];
            const newHighlighted = highlighted.includes(characterName) 
                ? highlighted.filter(name => name !== characterName)
                : [...highlighted, characterName];
            
            return {
                ...prev,
                highlightedCharacters: newHighlighted
            };
        });
    };

    const saveName = () => {
        setConfig(prev => ({
            ...prev,
            name: nameText
        }));
        setEditingName(false);
    };

    const saveHeader = () => {
        setConfig(prev => ({
            ...prev,
            header: headerText
        }));
        setEditingHeader(false);
    };

    const moveItemUp = (section, index) => {
        if (index === 0) return; // Already at the top

        if (section === 'firstNightOrder' || section === 'otherNightOrder') {
            // Handle array-based sections
            const items = [...config[section]];
            const temp = items[index];
            items[index] = items[index - 1];
            items[index - 1] = temp;

            setConfig(prev => ({
                ...prev,
                [section]: items
            }));
        } else {
            // Handle array-based sections for characters
            const items = [...config[section]];
            const temp = items[index];
            items[index] = items[index - 1];
            items[index - 1] = temp;

            setConfig(prev => ({
                ...prev,
                [section]: items
            }));
        }
    };

    // Move item down in the order
    const moveItemDown = (section, index) => {
        const itemsLength = section === 'firstNightOrder' || section === 'otherNightOrder'
            ? config[section].length
            : config[section].length;

        if (index === itemsLength - 1) return; // Already at the bottom

        if (section === 'firstNightOrder' || section === 'otherNightOrder') {
            // Handle array-based sections
            const items = [...config[section]];
            const temp = items[index];
            items[index] = items[index + 1];
            items[index + 1] = temp;

            setConfig(prev => ({
                ...prev,
                [section]: items
            }));
        } else {
            // Handle array-based sections for characters
            const items = [...config[section]];
            const temp = items[index];
            items[index] = items[index + 1];
            items[index + 1] = temp;

            setConfig(prev => ({
                ...prev,
                [section]: items
            }));
        }
    };

    // Function to update a character's ability
    const updateCharacter = (section, name, value, setupTextValue = null, iconName = null, newName = null) => {
        setConfig(prev => {
            const characters = [...prev[section]];
            const index = characters.findIndex(([charName]) => charName === name);
            if (index !== -1) {
                if (newName) {
                    characters[index] = [newName, value];
                } else {
                    characters[index] = [name, value];
                }
            }

            const newConfig = {
                ...prev,
                [section]: characters
            };

            if (setupTextValue !== null) {
                if (setupTextValue.trim() === "") {
                    const newSetupText = { ...prev.setupText };
                    delete newSetupText[name];
                    newConfig.setupText = newSetupText;
                } else {
                    newConfig.setupText = {
                        ...prev.setupText,
                        [name]: setupTextValue
                    };
                }
            }

            if (iconName !== null) {
                if (!newConfig.icons) newConfig.icons = {};
                if (iconName.trim() === "") {
                    const newIcons = { ...newConfig.icons };
                    delete newIcons[name];
                    delete newIcons[`${name}-night`];
                    newConfig.icons = newIcons;
                } else {
                    newConfig.icons = {
                        ...newConfig.icons,
                        [name]: iconName,
                        [`${name}-night`]: iconName
                    };
                }
            }

            return newConfig;
        });

        setEditingItem(null);
    };

    // Function to add a new character
    const addCharacter = (section) => {
        if (newItemName.trim() === "") return;

        setConfig(prev => {
            const newConfig = {
                ...prev,
                [section]: [...(prev[section] || []), [newItemName, newItemValue]]
            };

            if (newSetupText && newSetupText.trim() !== "") {
                newConfig.setupText = {
                    ...prev.setupText,
                    [newItemName]: newSetupText
                };
            }

            if (newIconName && newIconName.trim() !== "") {
                if (!newConfig.icons) newConfig.icons = {};
                newConfig.icons = {
                    ...newConfig.icons,
                    [newItemName]: newIconName
                };
            }

            return newConfig;
        });

        setNewItemName("");
        setNewItemValue("");
        setNewSetupText("");
        setNewIconName("");
        setEditingSection(null);
        setAddFromExisting(false);
    };

    // Function to add a character from existing characters
    const addFromExistingCharacter = (section, characterName) => {
        if (!characterName || !Characters[characterName]) return;

        const character = Characters[characterName];
        
        setConfig(prev => {
            const newConfig = {
                ...prev,
                [section]: [...(prev[section] || []), [characterName, character.ability]]
            };

            if (character.setupText) {
                newConfig.setupText = {
                    ...prev.setupText,
                    [characterName]: character.setupText
                };
            }

            return newConfig;
        });

        setNewItemName("");
        setNewItemValue("");
        setNewSetupText("");
        setNewIconName("");
        setEditingSection(null);
        setAddFromExisting(false);
    };

    // Function to delete a character
    const deleteCharacter = (section, name) => {
        setConfig(prev => {
            const characters = prev[section].filter(([charName]) => charName !== name);

            const setupTextCopy = { ...prev.setupText };
            if (name in setupTextCopy) {
                delete setupTextCopy[name];
            }

            const iconsCopy = { ...prev.icons };
            if (name in iconsCopy) {
                delete iconsCopy[name];
            }

            // Remove from highlighted characters if present
            const highlightedCopy = (prev.highlightedCharacters || []).filter(char => char !== name);

            return {
                ...prev,
                [section]: characters,
                setupText: setupTextCopy,
                icons: iconsCopy,
                highlightedCharacters: highlightedCopy
            };
        });
    };

    // Function to add item to order arrays
    const addToOrder = (orderType, item) => {
        if (item.trim() === "") return;

        setConfig(prev => ({
            ...prev,
            [orderType]: [...prev[orderType], item]
        }));

        setNewItemName("");
        setNewIconName("");
        setEditingSection(null);
    };

    const removeFromOrder = (orderType, index) => {
        setConfig(prev => ({
            ...prev,
            [orderType]: prev[orderType].filter((_, i) => i !== index)
        }));
    };

    const updateOrderItem = (section, index, newName, iconName) => {
        setConfig(prev => {
            const newOrder = [...prev[section]];
            newOrder[index] = newName;

            const newConfig = {
                ...prev,
                [section]: newOrder
            };

            if (iconName !== null) {
                if (!newConfig.icons) newConfig.icons = {};
                if (iconName.trim() === "") {
                    const newIcons = { ...newConfig.icons };
                    delete newIcons[`${newName}-night`];
                    newConfig.icons = newIcons;
                } else {
                    newConfig.icons = {
                        ...newConfig.icons,
                        [`${newName}-night`]: iconName
                    };
                }
            }

            return newConfig;
        });

        setEditingItem(null);
    };

    const getSetupText = (characterName) => {
        return config.setupText?.[characterName] || "";
    };

    const getIconName = (characterName) => {
        return config.icons?.[characterName] || "";
    };

    const isHighlighted = (characterName) => {
        return (config.highlightedCharacters || []).includes(characterName);
    };

    const renderCharacterSection = (title, section) => {
        return (
            <Accordion
                expanded={expandedSections[section]}
                onChange={() => toggleSection(section)}
                sx={{
                    mb: 2,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: '10px',
                    // maxWidth: '1200px',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)'
                }}
                TransitionProps={{ unmountOnExit: true }}
                disableGutters
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{title} ({(config[section] || []).length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        {(config[section] || []).map(([name, ability], index) => {
                            const hasSetupText = name in (config.setupText || {});
                            const setupText = getSetupText(name);
                            const iconName = getIconName(name);
                            const highlighted = isHighlighted(name);

                            return (
                                <Card 
                                    key={`${section}-${name}`} 
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.text.primary,
                                        width: '100%',
                                    }}
                                >
                                    {editingItem === `${section}-${name}` ? (
                                        <CardContent>
                                            <Stack spacing={2}>
                                                <TextField
                                                    inputRef={nameFieldRef}
                                                    label="Character Name"
                                                    value={newItemName}
                                                    onChange={(e) => setNewItemName(e.target.value)}
                                                    fullWidth
                                                    sx={{
                                                        '& .MuiInputBase-input': {
                                                            color: theme.palette.text.primary
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: theme.palette.text.secondary
                                                        }
                                                    }}
                                                />
                                                <TextField
                                                    label="Ability"
                                                    value={newItemValue}
                                                    onChange={(e) => setNewItemValue(e.target.value)}
                                                    multiline
                                                    rows={3}
                                                    fullWidth
                                                    sx={{
                                                        '& .MuiInputBase-input': {
                                                            color: theme.palette.text.primary
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: theme.palette.text.secondary
                                                        }
                                                    }}
                                                />
                                                <TextField
                                                    label="Setup Text"
                                                    value={newSetupText}
                                                    onChange={(e) => setNewSetupText(e.target.value)}
                                                    fullWidth
                                                    sx={{
                                                        '& .MuiInputBase-input': {
                                                            color: theme.palette.text.primary
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: theme.palette.text.secondary
                                                        }
                                                    }}
                                                />
                                                <TextField
                                                    label="Icon Name"
                                                    value={newIconName}
                                                    onChange={(e) => setNewIconName(e.target.value)}
                                                    fullWidth
                                                    sx={{
                                                        '& .MuiInputBase-input': {
                                                            color: theme.palette.text.primary
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: theme.palette.text.secondary
                                                        }
                                                    }}
                                                />
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<SaveIcon />}
                                                        onClick={() => updateCharacter(section, name, newItemValue, newSetupText, newIconName, newItemName)}
                                                        sx={{
                                                            backgroundColor: theme.palette.primary.main,
                                                            color: theme.palette.primary.contrastText
                                                        }}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<CloseIcon />}
                                                        onClick={() => setEditingItem(null)}
                                                        sx={{
                                                            borderColor: theme.palette.text.primary,
                                                            color: theme.palette.text.primary
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    ) : (
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => moveItemUp(section, index)}
                                                            disabled={index === 0}
                                                            sx={{ color: theme.palette.text.primary }}
                                                        >
                                                            <KeyboardArrowUpIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => moveItemDown(section, index)}
                                                            disabled={index === config[section].length - 1}
                                                            sx={{ color: theme.palette.text.primary }}
                                                        >
                                                            <KeyboardArrowDownIcon />
                                                        </IconButton>
                                                    </Box>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Typography variant="subtitle1">{name}</Typography>
                                                            {hasSetupText && (
                                                                <Chip
                                                                    label={setupText}
                                                                    size="small"
                                                                    color="secondary"
                                                                />
                                                            )}
                                                            {iconName && (
                                                                <Chip
                                                                    label={iconName}
                                                                    size="small"
                                                                    color="primary"
                                                                />
                                                            )}
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => toggleHighlighted(name)}
                                                                color={highlighted ? "warning" : "default"}
                                                                sx={{ color: highlighted ? theme.palette.warning.main : theme.palette.text.primary }}
                                                            >
                                                                <StarIcon />
                                                            </IconButton>
                                                        </Box>
                                                        <Typography variant="body2" sx={{ mt: 1 }}>{ability}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexShrink: 0 }}>
                                                    <IconButton
                                                        onClick={() => {
                                                            setEditingItem(`${section}-${name}`);
                                                            setNewItemName(name);
                                                            setNewItemValue(ability);
                                                            setNewSetupText(setupText);
                                                            setNewIconName(iconName);
                                                        }}
                                                        size="small"
                                                        sx={{ color: theme.palette.text.primary }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => deleteCharacter(section, name)}
                                                        size="small"
                                                        color="error"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    )}
                                </Card>
                            );
                        })}
                    </Stack>

                    {editingSection === section ? (
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                mt: 2,
                                backgroundColor: theme.palette.background.default,
                                color: theme.palette.text.primary,
                                width: '100%'
                            }}
                        >
                            <CardContent>
                                <Stack spacing={2}>
                                    {addFromExisting ? (
                                        <Autocomplete
                                            options={Object.keys(Characters)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    inputRef={nameFieldRef}
                                                    label="Select Character"
                                                    fullWidth
                                                />
                                            )}
                                            onChange={(e, value) => {
                                                if (value) {
                                                    addFromExistingCharacter(section, value);
                                                }
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <TextField
                                                inputRef={nameFieldRef}
                                                label="Character Name"
                                                value={newItemName}
                                                onChange={(e) => setNewItemName(e.target.value)}
                                                fullWidth
                                                sx={{
                                                    '& .MuiInputBase-input': {
                                                        color: theme.palette.text.primary
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: theme.palette.text.secondary
                                                    }
                                                }}
                                            />
                                            <TextField
                                                label="Ability"
                                                value={newItemValue}
                                                onChange={(e) => setNewItemValue(e.target.value)}
                                                multiline
                                                rows={3}
                                                fullWidth
                                                sx={{
                                                    '& .MuiInputBase-input': {
                                                        color: theme.palette.text.primary
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: theme.palette.text.secondary
                                                    }
                                                }}
                                            />
                                            <TextField
                                                label="Setup Text"
                                                value={newSetupText}
                                                onChange={(e) => setNewSetupText(e.target.value)}
                                                placeholder="e.g. [+1 outsider]"
                                                fullWidth
                                                sx={{
                                                    '& .MuiInputBase-input': {
                                                        color: theme.palette.text.primary
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: theme.palette.text.secondary
                                                    }
                                                }}
                                            />
                                            <TextField
                                                label="Icon Name"
                                                value={newIconName}
                                                onChange={(e) => setNewIconName(e.target.value)}
                                                fullWidth
                                                sx={{
                                                    '& .MuiInputBase-input': {
                                                        color: theme.palette.text.primary
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: theme.palette.text.secondary
                                                    }
                                                }}
                                            />
                                        </>
                                    )}
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {!addFromExisting && (
                                            <Button
                                                variant="contained"
                                                startIcon={<SaveIcon />}
                                                onClick={() => addCharacter(section)}
                                                sx={{
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: theme.palette.primary.contrastText
                                                }}
                                            >
                                                Add
                                            </Button>
                                        )}
                                        <Button
                                            variant="outlined"
                                            startIcon={<CloseIcon />}
                                            onClick={() => {
                                                setEditingSection(null);
                                                setAddFromExisting(false);
                                            }}
                                            sx={{
                                                borderColor: theme.palette.text.primary,
                                                color: theme.palette.text.primary
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    ) : (
                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => {
                                    setEditingSection(section);
                                    setNewItemName("");
                                    setNewItemValue("");
                                    setNewSetupText("");
                                    setNewIconName("");
                                    setAddFromExisting(false);
                                }}
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText
                                }}
                            >
                                Add Custom Character
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => {
                                    setEditingSection(section);
                                    setNewItemName("");
                                    setNewItemValue("");
                                    setNewSetupText("");
                                    setNewIconName("");
                                    setAddFromExisting(true);
                                }}
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText
                                }}
                            >
                                Add Real Character
                            </Button>
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>
        );
    };

    const renderOrderSection = (title, section) => {
        return (
            <Accordion
                expanded={expandedSections[section]}
                onChange={() => toggleSection(section)}
                sx={{ 
                    mb: 2,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: '10px',
                    // maxWidth: '1200px',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
                }}
                disableGutters
                TransitionProps={{ unmountOnExit: true }}
            >
                <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={1}>
                        {(config[section] || []).map((item, index) => {
                            const iconName = config.icons?.[`${item}-night`] || "";

                            return (
                                <Card 
                                    key={`${section}-${item}`} 
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.text.primary,
                                        width: '100%'
                                    }}
                                >
                                    <CardContent sx={{ py: 1 }}>
                                        {editingItem === `${section}-${index}` ? (
                                            <Stack spacing={2}>
                                                <TextField
                                                    inputRef={nameFieldRef}
                                                    label="Character/Action Name"
                                                    value={newItemName}
                                                    onChange={(e) => setNewItemName(e.target.value)}
                                                    fullWidth
                                                    sx={{
                                                        '& .MuiInputBase-input': {
                                                            color: theme.palette.text.primary
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: theme.palette.text.secondary
                                                        }
                                                    }}
                                                />
                                                <TextField
                                                    label="Icon Name"
                                                    value={newIconName}
                                                    onChange={(e) => setNewIconName(e.target.value)}
                                                    fullWidth
                                                    sx={{
                                                        '& .MuiInputBase-input': {
                                                            color: theme.palette.text.primary
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: theme.palette.text.secondary
                                                        }
                                                    }}
                                                />
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<SaveIcon />}
                                                        onClick={() => updateOrderItem(section, index, newItemName, newIconName)}
                                                        sx={{
                                                            backgroundColor: theme.palette.primary.main,
                                                            color: theme.palette.primary.contrastText
                                                        }}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<CloseIcon />}
                                                        onClick={() => setEditingItem(null)}
                                                        sx={{
                                                            borderColor: theme.palette.text.primary,
                                                            color: theme.palette.text.primary
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </Stack>
                                        ) : (
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => moveItemUp(section, index)}
                                                            disabled={index === 0}
                                                            sx={{ color: theme.palette.text.primary }}
                                                        >
                                                            <KeyboardArrowUpIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => moveItemDown(section, index)}
                                                            disabled={index === config[section].length - 1}
                                                            sx={{ color: theme.palette.text.primary }}
                                                        >
                                                            <KeyboardArrowDownIcon />
                                                        </IconButton>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography>{item}</Typography>
                                                        {iconName && (
                                                            <Chip
                                                                label={iconName}
                                                                size="small"
                                                                color="primary"
                                                            />
                                                        )}
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <IconButton
                                                        onClick={() => {
                                                            setEditingItem(`${section}-${index}`);
                                                            setNewItemName(item);
                                                            setNewIconName(iconName);
                                                        }}
                                                        size="small"
                                                        sx={{ color: theme.palette.text.primary }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => removeFromOrder(section, index)}
                                                        color="error"
                                                        size="small"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Stack>

                    {editingSection === section ? (
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                mt: 2,
                                backgroundColor: theme.palette.background.default,
                                color: theme.palette.text.primary,
                                width: '100%'
                            }}
                        >
                            <CardContent>
                                <Stack spacing={2}>
                                    <TextField
                                        inputRef={nameFieldRef}
                                        label="Character/Action Name"
                                        value={newItemName}
                                        onChange={(e) => setNewItemName(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Icon Name"
                                        value={newIconName}
                                        onChange={(e) => setNewIconName(e.target.value)}
                                        placeholder="append -swapped for red/blue swapped version"
                                        fullWidth
                                    />
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            onClick={() => {
                                                addToOrder(section, newItemName);
                                                setConfig(prev => ({
                                                    ...prev,
                                                    icons: {
                                                        ...prev.icons,
                                                        [`${newItemName}-night`]: newIconName
                                                    }
                                                }));
                                            }}
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<CloseIcon />}
                                            onClick={() => setEditingSection(null)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    ) : (
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => {
                                    setEditingSection(section);
                                    setNewItemName("");
                                    setNewIconName("");
                                }}
                            >
                                Add Order Item
                            </Button>
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>
        );
    };

    return (
        <Box sx={{ padding: '2rem' }}>
            <Dialog open={newConfigDialogOpen} onClose={handleCancelNewConfig}>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to create a new script? This will destroy all unsaved changes.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelNewConfig}>Cancel</Button>
                    <Button onClick={handleConfirmNewConfig}>Create New Script</Button>
                </DialogActions>
            </Dialog>
            <Button sx={{ mb: 3 }} variant="contained" onClick={handleNewConfig}>New Script</Button>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
                <TextField
                    label="Name"
                    value={config.name}
                    onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                    fullWidth
                />
                <Button 
                    disabled={!username} 
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={() => {
                        saveConfig(config, config.name, username)
                            .then(() => {
                                showToast(`Saved ${config.name}`, false);
                            })
                            .catch(() => {
                                showToast(`Failed to save ${config.name}`, true);
                            });
                    }}
                >
                    {username ? "Save (will clobber any of your saved scripts with the same name)" : "Choose a username to save"}
                </Button>
            </Box>
            <Card sx={{ mb: 3, boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)' }}>
                <CardContent>
                    {editingHeader ? (
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <TextField
                                inputRef={nameFieldRef}
                                label="Header Text"
                                value={headerText}
                                onChange={(e) => setHeaderText(e.target.value)}
                                multiline
                                rows={3}
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                onClick={saveHeader}
                                startIcon={<SaveIcon />}
                            >
                                Save
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                            <Typography variant="body1">
                                {config.header}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setHeaderText(config.header || "");
                                    setEditingHeader(true);
                                    setTimeout(() => nameFieldRef.current?.focus(), 0);
                                }}
                                startIcon={<EditIcon />}
                            >
                                {config.header ? "Edit Header" : "Add Header"}
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {renderCharacterSection("Townsfolk", "townsfolk")}
            {renderCharacterSection("Outsiders", "outsiders")}
            {renderCharacterSection("Minions", "minions")}
            {renderCharacterSection("Demons", "demons")}
            {renderOrderSection("First Night Order", "firstNightOrder")}
            {renderOrderSection("Other Night Order", "otherNightOrder")}
        </Box>
    );
};

export default ConfigEditor;