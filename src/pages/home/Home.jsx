import React from 'react'
import SearchAndCategories from './searchAndCategories/SearchAndCategories'
import Products from './products/Products'
import SupportButton from '../supportButton/SupportButton'
import HeroSection from './heroSection/HeroSection'
import WhatsNew from './whatsNew/WhatsNew'
import CategoriesSection from './categoriesSection/CateoriesSection'
import UsersSection from './userSection/UsersSection'


const Home = () => {
  return (
    <div>
      <HeroSection/>
      <WhatsNew/>
      <SupportButton/>
      <CategoriesSection onCategorySelect={(categoryName) => setSearchTerm(categoryName)} />
      <UsersSection/>
      <Products/>

    </div>
  )
}

export default Home