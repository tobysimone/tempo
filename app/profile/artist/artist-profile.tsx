'use client';

import { FlowbiteTheme } from '@/app/_shared/theme/flowbite-theme';
import './styles.css';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

export default function ArtistProfile() {
  return (
    <div className="page-container !flex-row !items-stretch">
      <Sidebar id="artist-profile-sidebar" className="fixed" theme={FlowbiteTheme.SIDEBAR}>
        <Sidebar.Logo href="" img="">
          Artist Profile
        </Sidebar.Logo>
        <hr />
        <Sidebar.Items className="mt-3">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox} label="3">
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}