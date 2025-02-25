// const serverURL = "http://5.161.219.95:5051";
const serverURL = 'https://glydergames.com/scripts/app'
// const serverURL = 'http://localhost:5000'

export const saveConfig = async (config, configName, username) => {
    const response = await fetch(`${serverURL}/save?username=${username}&config_name=${configName}`, {
        method: 'POST',
        body: JSON.stringify(config),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error('Failed to save config')
    }

    return response.json()
}

export const listPublicConfigs = async () => {
    const response = await fetch(`${serverURL}/public`)

    if (!response.ok) {
        throw new Error('Failed to list public configs')
    }

    return response.json()
}

export const listConfigs = async (username) => {
    const response = await fetch(`${serverURL}/list?username=${username}`)

    if (!response.ok) {
        throw new Error('Failed to list configs')
    }

    return response.json()
}

export const loadConfig = async (configName, username) => {
    const response = await fetch(`${serverURL}/load?config_name=${configName}&username=${username}`)

    if (!response.ok) {
        throw new Error('Failed to load config')
    }

    return response.json()
}

export const deleteConfig = async (configName, username) => {
    const response = await fetch(`${serverURL}/delete?config_name=${configName}&username=${username}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Failed to delete config')
    }

    return response.json()
}

export const publishConfig = async (configName, username) => {
    const response = await fetch(`${serverURL}/publish?config_name=${configName}&username=${username}`, {
        method: 'POST'
    })
    
    if (!response.ok) {
        throw new Error('Failed to publish config')
    }

    return response.json()
}

export const unpublishConfig = async (configName, username) => {
    const response = await fetch(`${serverURL}/unpublish?config_name=${configName}&username=${username}`, {
        method: 'POST'
    })
    
    if (!response.ok) {
        throw new Error('Failed to unpublish config')
    }

    return response.json()
}