import { createContext, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { createFeature, fetchAllFeatures, fetchFeature } from '../api'

const FeatureContext = createContext({})

const FeatureProvider = ({ children }) => {
    const [features, setFeatures] = useState([])
    const [feature, setFeature] = useState({})
    
    const { token } = useContext(AuthContext)

    const addFeature = async (data, project_id) => {
        if (token) {
            const newFeature = await createFeature(token, data, project_id)
            setFeatures([...features, newFeature])
            return newFeature
        }
    }

    const getFeatures = async (project_id) => {
        try {
            const featuresResponse = await fetchAllFeatures(token, project_id)
            setFeatures(featuresResponse)
            return featuresResponse
        } catch (error) {
            console.error('Throw error while fetcing all features', error);
            throw error
        }
    }

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