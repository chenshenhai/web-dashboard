import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu } from 'antd';
import { TypeLayoutExtends } from './type';
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
function updatePagePath() {
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

  private _pageRef: any;
  constructor(props: any) {
    super(props);
    this._pageRef = React.createRef(); 
  }

  componentDidMount() {
    this.initHistoryListener();
    this.registerPathListener();
    this.renderPageContent();
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
                    return (
                    <Menu.Item key={`${idx}-${childIdx}`}
                      onClick={() => { this.onClickMenu({page: child.page, tab: child.tab}) }}  >
                      {child.name}
                    </Menu.Item>)
                  })}
                </SubMenu>
              )
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
            <div ref={this._pageRef as React.RefObject<HTMLDivElement>}></div>
          </Content>
        </Layout>
      </Layout>
    );
  }

  onClickMenu(params: {[key: string]: string}) {
    const { $extends } = this.props;
    $extends.goToPage('', params);
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
    const {  } = this.props;
    window.addEventListener('pushState', () => {
      this.renderPageContent();
    })
    window.addEventListener('replaceState', () => {
      this.renderPageContent();
    })
    window.addEventListener('popstate', () => {
      this.renderPageContent();
    })
  }


  renderPageContent() {
    const data = updatePagePath();
    const { prevPagePath, nextPagePath } = data;
    const prevSearch = '?' + prevPagePath.split('?')[1] || '';
    const nextSearch = '?' + nextPagePath.split('?')[1] || '';
    const prevParams = new URLSearchParams(prevSearch);
    const nextParams = new URLSearchParams(nextSearch);
    if (prevParams.get('page') === nextParams.get('page')){
      return;
    }
    const { $extends } = this.props;
    $extends.getPage(nextParams.get('page') as string).then((page) => {
      let Page = page;
      console.log('Page ========', Page);
      if (page.default) {
        Page = page.default;
      }
      ReactDOM.unmountComponentAtNode(this._pageRef.current);
      ReactDOM.render(React.createElement(Page, {}, null), this._pageRef.current);
    }).catch(console.log);

  }
  
  
}

export default LayoutTheme;
