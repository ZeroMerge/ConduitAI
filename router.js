// Conduit AI - Client-Side Router
// Handles navigation and active states properly

class Router {
    constructor() {
        this.routes = {
            'index.html': { name: 'home', title: 'Conduit AI - Intelligent Workflow Automation' },
            'dashboard.html': { name: 'dashboard', title: 'Dashboard - Conduit AI' },
            'workflow-builder.html': { name: 'builder', title: 'Workflow Builder - Conduit AI' },
            'app-connections.html': { name: 'connections', title: 'App Connections - Conduit AI' },
            'execution-history.html': { name: 'history', title: 'Execution History - Conduit AI' }
        };
        this.currentRoute = this.getCurrentRoute();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateActiveStates();
        this.updatePageTitle();
    }

    getCurrentRoute() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return this.routes[filename] || this.routes['index.html'];
    }

    setupEventListeners() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-navigate]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-navigate');
                this.navigateTo(route);
            }

            const href = e.target.closest('a[href]');
            if (href && href.hostname === window.location.hostname) {
                const route = href.getAttribute('href');
                if (route && this.isValidRoute(route)) {
                    e.preventDefault();
                    this.navigateTo(route);
                }
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.route) {
                this.navigateTo(e.state.route, false);
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                this.navigateTo(route);
            }
        });
    }

    navigateTo(route, pushState = true) {
        if (!this.isValidRoute(route)) {
            console.error(`Invalid route: ${route}`);
            return;
        }

        const fullRoute = this.getFullRoute(route);
        
        if (pushState) {
            window.history.pushState({ route }, '', fullRoute);
        }

        window.location.href = fullRoute;
    }

    isValidRoute(route) {
        const validRoutes = Object.keys(this.routes);
        return validRoutes.includes(route) || validRoutes.includes(route.replace('./', ''));
    }

    getFullRoute(route) {
        if (route.startsWith('./') || route.startsWith('/')) {
            return route;
        }
        return `./${route}`;
    }

    updateActiveStates() {
        // Remove active classes
        document.querySelectorAll('.nav-link.active, .sidebar-link.active').forEach(el => {
            el.classList.remove('active');
        });

        // Add active class to current route
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        
        // Update navigation links
        document.querySelectorAll(`[data-navigate="${currentFile}"]`).forEach(el => {
            el.classList.add('active');
        });

        // Update sidebar links
        document.querySelectorAll('.sidebar-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentFile || href === `./${currentFile}`) {
                link.classList.add('active');
            }
        });
    }

    updatePageTitle() {
        const route = this.getCurrentRoute();
        document.title = route.title;
    }

    getCurrentRouteName() {
        return this.currentRoute.name;
    }

    // Utility methods
    goBack() {
        window.history.back();
    }

    goForward() {
        window.history.forward();
    }

    refresh() {
        window.location.reload();
    }

    // Navigation helpers
    navigateToDashboard() {
        this.navigateTo('dashboard.html');
    }

    navigateToBuilder() {
        this.navigateTo('workflow-builder.html');
    }

    navigateToConnections() {
        this.navigateTo('app-connections.html');
    }

    navigateToHistory() {
        this.navigateTo('execution-history.html');
    }

    navigateToHome() {
        this.navigateTo('index.html');
    }
}

// Navigation Manager for app-specific navigation
class NavigationManager {
    constructor(router, dataStore) {
        this.router = router;
        this.dataStore = dataStore;
        this.setupNavigationHandlers();
    }

    setupNavigationHandlers() {
        // Handle app-specific navigation actions
        document.addEventListener('click', (e) => {
            // Handle connection navigation
            if (e.target.matches('[data-connection-id]')) {
                const connectionId = e.target.getAttribute('data-connection-id');
                this.navigateToConnection(connectionId);
            }

            // Handle workflow navigation
            if (e.target.matches('[data-workflow-id]')) {
                const workflowId = e.target.getAttribute('data-workflow-id');
                this.navigateToWorkflow(workflowId);
            }

            // Handle execution navigation
            if (e.target.matches('[data-execution-id]')) {
                const executionId = e.target.getAttribute('data-execution-id');
                this.navigateToExecution(executionId);
            }
        });
    }

    navigateToConnection(connectionId) {
        const connection = this.dataStore.getConnection(connectionId);
        if (connection) {
            // Store selected connection for detail page
            sessionStorage.setItem('selectedConnection', JSON.stringify(connection));
            // Could navigate to connection detail page if it existed
            console.log('Navigating to connection:', connection.name);
        }
    }

    navigateToWorkflow(workflowId) {
        const workflow = this.dataStore.getWorkflow(workflowId);
        if (workflow) {
            // Store selected workflow for detail page
            sessionStorage.setItem('selectedWorkflow', JSON.stringify(workflow));
            // Navigate to workflow builder with this workflow
            window.location.href = 'workflow-builder.html';
        }
    }

    navigateToExecution(executionId) {
        const execution = this.dataStore.getExecution(executionId);
        if (execution) {
            // Store selected execution for detail page
            sessionStorage.setItem('selectedExecution', JSON.stringify(execution));
            // Could navigate to execution detail page if it existed
            console.log('Navigating to execution:', execution.id);
        }
    }

    // Breadcrumb generation
    getBreadcrumbs(currentPage, context = {}) {
        const breadcrumbs = [
            { name: 'Home', href: 'index.html' }
        ];

        switch (currentPage) {
            case 'dashboard':
                breadcrumbs.push({ name: 'Dashboard', href: 'dashboard.html' });
                break;
            case 'builder':
                breadcrumbs.push({ name: 'Workflow Builder', href: 'workflow-builder.html' });
                if (context.workflow) {
                    breadcrumbs.push({ name: context.workflow.name, href: '#' });
                }
                break;
            case 'connections':
                breadcrumbs.push({ name: 'App Connections', href: 'app-connections.html' });
                if (context.connection) {
                    breadcrumbs.push({ name: context.connection.name, href: '#' });
                }
                break;
            case 'history':
                breadcrumbs.push({ name: 'Execution History', href: 'execution-history.html' });
                if (context.execution) {
                    breadcrumbs.push({ name: `Execution #${context.execution.id}`, href: '#' });
                }
                break;
        }

        return breadcrumbs;
    }

    // Mobile navigation
    setupMobileNavigation() {
        const mobileToggle = document.querySelector('[data-mobile-toggle]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');

        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Handle mobile navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-mobile-navigate]')) {
                const route = e.target.getAttribute('data-mobile-navigate');
                this.router.navigateTo(route);
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    }
}

// Initialize router and navigation manager
let router, navigationManager, dataStore;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize core services
    dataStore = new DataStore();
    router = new Router();
    navigationManager = new NavigationManager(router, dataStore);
    
    // Make services globally available
    window.appRouter = router;
    window.appNavigation = navigationManager;
    window.appDataStore = dataStore;
    
    // Setup mobile navigation
    navigationManager.setupMobileNavigation();
    
    console.log('Router and Navigation Manager initialized');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Router, NavigationManager };
}