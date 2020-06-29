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

let prevPagePath: string = '';
let nextPagePath: string = '';
function resetPagePath() {
  prevPagePath = nextPagePath;
  const { location } = window;
  const { pathname, search } = location;
  nextPagePath = `${pathname}${search}`;
  return {
    prevPagePath,
    nextPagePath,
  }
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

  componentDidMount() {
    this.initHistoryListener();
    this.registerPathListener();
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
          <div className="logo" />
          
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {menuConfig.map((item, idx) => {
              return (
                <SubMenu key={idx} icon={(<span className={['anticon', item.iconClassName].join(' ')}></span>)} title={item.name}>
                  {item.children.map((child, childIdx) => {
                    return (<Menu.Item onClick={() => { this.onClickMenu(child.page) }} key={`${idx}-${childIdx}`} >{child.name}</Menu.Item>)
                  })}
                </SubMenu>
              )
              // if (Array.isArray(item.children) && item.children.length > 0) {
              //   return (
              //     <SubMenu key={idx} icon={(<span className={['anticon', item.iconClassName].join(' ')}></span>)} title={item.name}>
              //       {item.children.map((child, childIdx) => {
              //         return (<Menu.Item onClick={() => { this.onClickMenu(child.page) }} key={`${idx}-${childIdx}`} >{child.name}</Menu.Item>)
              //       })}
              //     </SubMenu>
              //   )
              // } else {
              //   return (
              //     <Menu.Item onClick={() => { this.onClickMenu(item.page) }} key={idx} icon={(<span className={['anticon', item.iconClassName].join(' ')}></span>)}>
              //       {item.name}
              //     </Menu.Item>
              //   )
              // }
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

  onClickMenu(page: string) {
    const { $extends } = this.props;
    $extends.goToPage(page);
  }

  initHistoryListener() {
    const history = window.history as any;
    const watcher = function(type: string) {
      const evenEntity = history[type] as any;
      return function listener() {
        // @ts-ignore
        const registerFunc = evenEntity.apply(this, arguments);
        const e = new Event(type) as any;
        e.__$arguments = arguments;
        window.dispatchEvent(e);
        return registerFunc;
      };
    };
    history.pushState = watcher('pushState');
    history.replaceState = watcher('replaceState');
  }

  registerPathListener() {
    window.addEventListener('pushState', () => {
      const params = resetPagePath();
      console.log('pushState =', params);
    })
    window.addEventListener('replaceState', () => {
      const params = resetPagePath();
      console.log('replaceState =', params);
    })
    window.addEventListener('popstate', function(event) {
      const params = resetPagePath();
      console.log('popstate =', params);
    })
  }

  
  
  
}

export default LayoutTheme;
