import React, { useState } from 'react'
import { useEffect } from 'react'
import RecommendationService from '../../services/RecommendationService'
import RecommendBy from './RecommendBy'

const RecommendBox = ({product}) => {
    const [byId, setById] = useState([])
    const [similar, setSimilar] = useState([])
    const [byAttrs, setByAttrs] = useState([])
    // RecommendationService.getRecommendations(product, setRecommended)
    
    useEffect(() => {
        RecommendationService.getRecommendById(product, setById);
        RecommendationService.getSimilar(product, setSimilar);
        RecommendationService.getRecommendByAttrs(product, setByAttrs);
    }, [])

  return (
    <div>
      {byId.length > 0 ? <RecommendBy key="Id" by="Id" products={byId} /> : <></>}
      {byAttrs.length > 0 ? <RecommendBy key="Attrs" by="Filter" products={byAttrs} /> : <></>}
      {similar.length > 0 ? <RecommendBy key="Similar" by="Similar" products={similar} /> : <></>}
    </div>
  )
}

export default RecommendBox
