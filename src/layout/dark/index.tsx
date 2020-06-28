import React from 'react';
import { Layout, Menu } from 'antd';
import './index.less';

const { Header, Sider, Content } = Layout;

class LayoutTheme extends React.Component {
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
            <Menu.Item key="1" icon={(<span className="anticon webdashboard-icon-code"></span>)}>
              编码处理
            </Menu.Item>
            <Menu.Item key="2" icon={(<span className="anticon">icon2</span>)}>
              文本处理
            </Menu.Item>
            <Menu.Item key="3" icon={(<span className="anticon">icon3</span>)}>
              图像处理
            </Menu.Item>
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
