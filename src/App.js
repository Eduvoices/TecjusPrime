import React, {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from './AppTopbar';
import {AppBreadcrumb} from './AppBreadcrumb';
import {AppFooter} from './AppFooter';
import {AppMenu} from './AppMenu';
import {AppInlineProfile} from './AppInlineProfile';
import {withRouter} from 'react-router';
import {Route} from 'react-router-dom';
import {Dashboard} from './components/Dashboard';
import {FormsDemo} from './components/FormsDemo';
import {SampleDemo} from './components/SampleDemo';
import {DataDemo} from './components/DataDemo';
import {PanelsDemo} from './components/PanelsDemo';
import {OverlaysDemo} from './components/OverlaysDemo';
import {MenusDemo} from './components/MenusDemo';
import {MessagesDemo} from './components/MessagesDemo';
import {ChartsDemo} from './components/ChartsDemo';
import {MiscDemo} from './components/MiscDemo';
import {EmptyPage} from './components/EmptyPage';
import {Documentation} from './components/Documentation';
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel';
import 'primereact/resources/primereact.min.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			layoutMode: 'static',
			overlayMenuActive: false,
			staticMenuDesktopInactive: false,
			staticMenuMobileActive: false,
			topbarMenuActive: false,
			activeTopbarItem: null,
			darkMenu: true,
			menuActive: false,
			profileMode: 'inline',
			grouped: true
		};

		this.onDocumentClick = this.onDocumentClick.bind(this);
		this.onMenuClick = this.onMenuClick.bind(this);
		this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
		this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
		this.onThemeChange = this.onThemeChange.bind(this);
		this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
		this.createMenu();
	}

	onMenuClick(event) {
		this.menuClick = true;

		if (!this.isHorizontal()) {
			setTimeout(() => {
				this.layoutMenuScroller.moveBar();
			}, 500);
		}
	}

	onMenuButtonClick(event) {
		this.menuClick = true;
		this.setState(({
			topbarMenuActive: false
		}));

		if (this.state.layoutMode === 'overlay' && !this.isMobile()) {
			this.setState({
				overlayMenuActive: !this.state.overlayMenuActive
			});
		}
		else {
			if (this.isDesktop())
				this.setState({staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive});
			else
				this.setState({staticMenuMobileActive: !this.state.staticMenuMobileActive});
		}

		event.preventDefault();
	}

	onTopbarMenuButtonClick(event) {
		this.topbarItemClick = true;
		this.setState({topbarMenuActive: !this.state.topbarMenuActive});
		this.hideOverlayMenu();
		event.preventDefault();
	}

	onTopbarItemClick(event) {
		this.topbarItemClick = true;

		if (this.state.activeTopbarItem === event.item)
			this.setState({activeTopbarItem: null});
		else
			this.setState({activeTopbarItem: event.item});

		event.originalEvent.preventDefault();
	}

	onMenuItemClick(event) {
		if (!event.item.items) {
			this.hideOverlayMenu();
		}
		if (!event.item.items && (this.isHorizontal() || this.isSlim())) {
			this.setState({
				menuActive: false
			})
		}
	}

	onRootMenuItemClick(event) {
		this.setState({
			menuActive: !this.state.menuActive
		});

		event.originalEvent.preventDefault();
	}

	onDocumentClick(event) {
		if (!this.topbarItemClick) {
			this.setState({
				activeTopbarItem: null,
				topbarMenuActive: false
			});
		}

		if (!this.menuClick) {
			if (this.isHorizontal() || this.isSlim()) {
				this.setState({
					menuActive: false
				})
			}

			this.hideOverlayMenu();
		}

		this.topbarItemClick = false;
		this.menuClick = false;
	}

	hideOverlayMenu() {
		this.setState({
			overlayMenuActive: false,
			staticMenuMobileActive: false
		})
	}

	isTablet() {
		let width = window.innerWidth;
		return width <= 1024 && width > 640;
	}

	isDesktop() {
		return window.innerWidth > 1024;
	}

	isMobile() {
		return window.innerWidth <= 640;
	}

	isOverlay() {
		return this.state.layoutMode === 'overlay';
	}

	isHorizontal() {
		return this.state.layoutMode === 'horizontal';
	}

	isSlim() {
		return this.state.layoutMode === 'slim';
	}

	changeTheme(theme,scheme) {
		this.changeStyleSheetUrl('layout-css', theme, 'layout', scheme);
		this.changeStyleSheetUrl('theme-css', theme, 'theme', scheme);
	}

	changeStyleSheetUrl(id, value, prefix, scheme) {
		let element = document.getElementById(id);
		let urlTokens = element.getAttribute('href').split('/');
		if(id.localeCompare('layout-css') === 0) {
			urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
		}
		else {
			urlTokens[urlTokens.length - 1] = 'theme-' + scheme +  '.css';
		}
		let newURL = urlTokens.join('/');
		element.setAttribute('href', newURL);
	}

	onThemeChange() {
		const themeLink = document.getElementById('theme-css');
		const href = themeLink.href;
		const themeFile = href.substring(href.lastIndexOf('/') + 1, href.lastIndexOf('.'));
		const themeTokens = themeFile.split('-');
		const themeName = themeTokens[1];
		const themeMode = themeTokens[2];
		const newThemeMode = (themeMode === 'dark') ? 'light' : 'dark';

		this.changeTheme(themeName + '-' + newThemeMode);

	}

	createMenu() {
		this.menuGrouped = [
			{ 	label: 'Home Page', icon: 'pi pi-fw pi-home',
				items: [
					{label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => { window.location = '#/'}}
				]
			},
			{ label: 'Customization', icon: 'pi pi-fw pi-cog',
				items: [
					{	label: 'Menu Layouts', icon: 'pi pi-fw pi-th-large', badge: 2,
						items: [
							{label: 'Static Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'static'})},
							{label: 'Overlay Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'overlay'})},
							{label: 'Slim Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'slim'})},
							{label: 'Horizontal Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'horizontal'})},
							{label: 'Grouped Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({grouped: true})},
							{label: 'Ungrouped Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({grouped: false})}
						]
					},
					{
						label: 'Menu Colors', icon: 'pi pi-fw pi-list', badge: 2,
						items: [
							{ label: 'Light', icon: 'pi pi-fw pi-circle-off', command: () => this.setState({darkMenu: false})},
							{ label: 'Dark', icon: 'pi pi-fw pi-circle-on', command: () => this.setState({darkMenu: true})}
						]
					},
					{label: 'User Profile', icon: 'pi pi-fw pi-user', badge: 2,
						items: [
							{label: 'Popup Profile', icon: 'pi pi-fw pi-user',  command: () => this.setState({profileMode: 'popup'})},
							{label: 'Inline Profile', icon: 'pi pi-fw pi-user',  command: () => this.setState({profileMode: 'inline'})}
						]
					},
					{
						label: 'Themes', icon: 'pi pi-fw pi-pencil', badge: 17,
						items: [
							{
								label: 'Blue', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('blue', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('blue', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('blue', 'dark')
									}
								]
							},
							{
								label: 'Blue Grey', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('bluegrey', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('bluegrey', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('bluegrey', 'dark')
									}
								]
							},
							{
								label: 'Light Blue', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightblue', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightblue', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightblue', 'dark')
									}
								]
							},
							{
								label: 'Indigo', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('indigo', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('indigo', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('indigo', 'dark')
									}
								]
							},
							{
								label: 'Pink', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('pink', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('pink', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('pink', 'dark')
									}
								]
							},
							{
								label: 'Green', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('green', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('green', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('green', 'dark')
									}
								]
							},
							{
								label: 'Light Green', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightgreen', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightgreen', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightgreen', 'dark')
									}
								]
							},
							{
								label: 'Teal', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('teal', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('teal', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('teal', 'dark')
									}
								]
							},
							{
								label: 'Cyan', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('cyan', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('cyan', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('cyan', 'dark')
									}
								]
							},
							{
								label: 'Lime', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lime', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lime', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lime', 'dark')
									}
								]
							},
							{
								label: 'Amber', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('amber', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('amber', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('amber', 'dark')
									}
								]
							},
							{
								label: 'Orange', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('orange', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('orange', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('orange', 'dark')
									}
								]
							},
							{
								label: 'Deep Orange', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeporange', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeporange', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeporange', 'dark')
									}
								]
							},
							{
								label: 'Yellow', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('yellow', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('yellow', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('yellow', 'dark')
									}
								]
							},
							{
								label: 'Purple', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('purple', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('purple', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('purple', 'dark')
									}
								]
							},
							{
								label: 'Deep Purple', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeppurple', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeppurple', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeppurple', 'dark')
									}
								]
							},
							{
								label: 'Brown', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('brown', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('brown', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('brown', 'dark')
									}
								]
							}
						]
					}
				]
			},
			{
				label: 'Components', icon: 'pi pi-fw pi-star',
				items: [
					{label: 'Sample Page', icon: 'pi pi-fw pi-th-large', command: () => {window.location = '#/sample'}},
					{label: 'Forms', icon: 'pi pi-fw pi-file', command: () => {window.location = '#/forms'}},
					{label: 'Data', icon: 'pi pi-fw pi-table', command: () => {window.location = "#/data"}},
					{label: 'Panels', icon: 'pi pi-fw pi-list', command: () => {window.location = "#/panels"}},
					{label: 'Overlays', icon: 'pi pi-fw pi-clone', command: () => {window.location = "#/overlays"}},
					{label: 'Menus', icon: 'pi pi-fw pi-plus', command: () => {window.location = "#/menus"}},
					{label: 'Messages', icon: 'pi pi-fw pi-spinner', command: () => {window.location = "#/messages"}},
					{label: 'Charts', icon: 'pi pi-fw pi-chart-bar', command: () => {window.location = "#/charts"}},
					{label: 'Misc', icon: 'pi pi-fw pi-upload', command: () => {window.location = "#/misc"}}
				]
			},
			{
				label: 'Pages', icon: 'pi pi-fw pi-copy',
				items: [
					{label: 'Empty Page', icon: 'pi pi-fw pi-clone', command: () => {window.location = "#/empty"}},
					{label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
					{label: 'Login', icon: 'pi pi-fw pi-sign-in', url: 'assets/pages/login.html', target: '_blank'},
					{label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', url: 'assets/pages/error.html', target: '_blank'},
					{label: '404 Page', icon: 'pi pi-fw pi-times', url: 'assets/pages/404.html', target: '_blank'},
					{label: 'Access Denied', icon: 'pi pi-fw pi-ban', url: 'assets/pages/access.html', target: '_blank'}
				]
			},
			{
				label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
				items: [
					{
						label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
						items: [
							{
								label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
								items: [
									{ label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in' },
								]
							},
							{
								label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
								items: [
									{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-sign-in' }
								]
							},
						]
					},
					{
						label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
						items: [
							{
								label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
								items: [
									{ label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-sign-in' },
								]
							},
							{
								label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
								items: [
									{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-sign-in' }
								]
							},
						]
					}
				]
			},
			{ label: 'Get Started', icon: 'pi pi-fw pi-download',
				items: [
					{
						label: 'Docs', icon: 'pi pi-fw pi-file', command: () => {window.location = "#/documentation"}
					},
					{
						label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
					}
				]
			}
		];

		this.menuUngrouped = [
			{
				label: 'Main Menu',
				icon: 'pi pi-fw pi-home',
				items: this.menuGrouped
			}
		];
	}

	render() {
		const layoutClassName = classNames('layout-wrapper', {
			'layout-horizontal': this.state.layoutMode === 'horizontal',
			'layout-overlay': this.state.layoutMode === 'overlay',
			'layout-static': this.state.layoutMode === 'static',
			'layout-slim': this.state.layoutMode === 'slim',
			'layout-static-inactive': this.state.staticMenuDesktopInactive,
			'layout-mobile-active': this.state.staticMenuMobileActive,
			'layout-overlay-active': this.state.overlayMenuActive,
			'layout-menu-dark': this.state.darkMenu,
			'layout-menu-light':!this.state.darkMenu
		});
		const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);

		return (
			<div className={layoutClassName} onClick={this.onDocumentClick}>
				<AppTopbar onThemeChange={this.onThemeChange} topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem}
						   onMenuButtonClick={this.onMenuButtonClick} onTopbarMenuButtonClick={this.onTopbarMenuButtonClick} onTopbarItemClick={this.onTopbarItemClick}
						   profileMode={this.state.profileMode} horizontal={this.isHorizontal()}/>

				<div className='layout-menu-container' onClick={this.onMenuClick}>
					<div className="layout-menu-logo">
						<a>
							<img id="layout-menu-logo" src="assets/layout/images/logo-white.png" alt="babylon-layout"/>
						</a>
					</div>
					<div className="layout-menu-wrapper">
						<ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height: '100%'}}>
							<div className="menu-scroll-content">
								{(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') && <AppInlineProfile />}
								<AppMenu model={this.state.grouped ? this.menuGrouped : this.menuUngrouped} onMenuItemClick={this.onMenuItemClick}
										 onRootMenuItemClick={this.onRootMenuItemClick}
										 layoutMode={this.state.layoutMode} active={this.state.menuActive}/>
							</div>
						</ScrollPanel>
					</div>
				</div>

				<div className="layout-main">
					<AppBreadCrumbWithRouter/>

					<div className="layout-content">
						<Route path="/" exact component={Dashboard}/>
						<Route path="/forms" component={FormsDemo}/>
						<Route path="/sample" component={SampleDemo}/>
						<Route path="/data" component={DataDemo}/>
						<Route path="/panels" component={PanelsDemo}/>
						<Route path="/overlays" component={OverlaysDemo}/>
						<Route path="/menus" component={MenusDemo}/>
						<Route path="/messages" component={MessagesDemo}/>
						<Route path="/charts" component={ChartsDemo}/>
						<Route path="/misc" component={MiscDemo}/>
						<Route path="/empty" component={EmptyPage}/>
						<Route path="/documentation" component={Documentation}/>
					</div>
				</div>

				<AppFooter/>

				{this.state.staticMenuMobileActive && <div className="layout-mask"></div>}
			</div>
		);
	}
}

export default App;
