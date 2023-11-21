'use client';

import './styles.css';

import ArtistSettingsSidebar from './components/ArtistSettingsSidebar';
import { useState } from 'react';
import ArtistProfileSettingsPage from './tabs/ArtistProfileSettings';

const tabs = [
  {
    index: 0,
    name: 'Profile',
    component: <ArtistProfileSettingsPage />
  }
]

export default function ArtistSettings() {
  const [activeTab, setActiveTab] = useState(0);

  const onSetActiveTab = (index: number) => {
    setActiveTab(index);
  }

  return (
    <div className="page-container !flex-row !items-stretch">
      <ArtistSettingsSidebar setActiveTab={onSetActiveTab} />
      <div className="container-fluid mt-5 px-4 w-full" style={{ marginLeft: 255 }}>
        <h1 className="text-4xl text-black dark:text-white font-bold">Settings<span className="text-3xl text-gray-500 ml-3">{ tabs[activeTab].name }</span></h1>
        <div className="mt-5">
          { tabs[activeTab].component }
        </div>
      </div>
    </div>
  );
}