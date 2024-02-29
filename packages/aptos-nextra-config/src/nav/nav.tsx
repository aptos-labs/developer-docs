// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

type Page = {
  title: string;
  type: 'page';
  display?: 'hidden';
  href?: string;
  newWindow?: boolean;
  theme?: {
    layout?: 'full';
    sidebar?: boolean;
    toc?: boolean;
    breadcrumb?: boolean;
    typesetting?: 'article';
  };
};

type Menu = {
  title: string;
  type: 'menu';
  items: {
    [key: string]: {
      title: string;
      href?: string;
      newWindow?: boolean;
    };
  };
};

type ConfigItem = Page | Menu;

type Config = {
  [key: string]: ConfigItem;
};

export enum NavigationHeaderCategories {
  BUILD = 'build',
  DEVELOPER_PLATFORMS = 'developer_platforms',
  NETWORK = 'network'
}