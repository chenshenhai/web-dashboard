import React from 'react';
import { Layout, Menu } from 'antd';
import { TypeLayoutExtends } from './../type';
import { menuConfig } from './config';
import './index.less';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

interface TypeLayoutProps {
  $extends: TypeLayoutExtends
}

interface TypeLayoutState {
  collapsed: boolean
}

class LayoutTheme extends React.Component<TypeLayoutProps, TypeLayoutState> {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
          <div className="logo" />
          
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {menuConfig.map((item, idx) => {
              if (Array.isArray(item.children) && item.children.length > 0) {
                return (
                  <SubMenu key={idx} icon={(<span className={['anticon', item.iconClassName].join(' ')}></span>)} title={item.name}>
                    {item.children.map((child, childIdx) => {
                      return (<Menu.Item key={`${idx}-${childIdx}`} >{child.name}</Menu.Item>)
                    })}
                  </SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={idx} icon={(<span className={['anticon', item.iconClassName].join(' ')}></span>)}>
                    {item.name}
                  </Menu.Item>
                )
              }
            })}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <div onClick={this.toggle.bind(this)}>BTN</div>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutTheme;
