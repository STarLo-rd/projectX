import React from 'react'
import Hero from './Hero'
import FeaturesSection from './FeaturesSection'
import ActionSection from './ActionSection'
import Navbar from './Navbar'
import BasicFooter from '../BasicFooter/BasicFooter'


const Home = () => {
    return (
        <>
        <Navbar />
        <Hero/>
        <FeaturesSection />
        <ActionSection />
        <BasicFooter/>
        </>
    )
}

export default Home