import React from 'react';
import './Home.css';
import SectionInfo from '../../components/SectionInfo/SectionInfo';
import SectionProducts from '../../components/SectionProducts/SectionProducts';

export default function Home() {
  return (
    <>
      <SectionInfo />
      <SectionProducts />
    </>
  );
}