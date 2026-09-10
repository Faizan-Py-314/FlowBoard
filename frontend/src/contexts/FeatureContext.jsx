import { createContext, useCallback, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { createFeature, fetchAllFeatures, fetchFeature } from '../api'

const FeatureContext = createContext({})

const FeatureProvider = ({ children }) => {
    const [features, setFeatures] = useState([])
    const [feature, setFeature] = useState({})
    
    const { token } = useContext(AuthContext)

    const addFeature = async (data, project_id) => {
        if (!token) {
            throw new Error('Not authenticated')
        }
        try {
            const newFeature = await createFeature(token, data, project_id)
            setFeatures(prevFeature => [...prevFeature, newFeature])
            return newFeature
        } catch (error) {
            console.error('Failed to create feature', error);
            throw error
        }
    }

    const getFeatures = useCallback(async (project_id) => {
        try {
            const featuresResponse = await fetchAllFeatures(token, project_id)
            setFeatures(featuresResponse)
            return featuresResponse
        } catch (error) {
            console.error('Throw error while fetcing all features', error);
            throw error
        }
    }, [token])

    const getFeature = async (project_id, feature_id) => {
        try {
            const featureResponse = await fetchFeature(token, project_id, feature_id)
            setFeature(featureResponse)
            return featureResponse
        } catch (error) {
            console.error('Throw error while fetching featire', error);
            throw error
        }
    }

  return (
    <FeatureContext.Provider value={{addFeature, getFeatures, getFeature, features, feature}}>
        {children}
    </FeatureContext.Provider>
  )
}

export {FeatureContext, FeatureProvider}