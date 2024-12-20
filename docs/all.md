# UI Components

## Table

### Pagination
- https://ui.shadcn.com/docs/components/data-table#pagination
- This will automatically paginate your rows into pages of 10. See the pagination docs for more information on customizing page size and implementing manual pagination.
    - https://tanstack.com/table/v8/docs/api/features/pagination
- `getPaginationRowModel: getPaginationRowModel(), `

- See Reusable Components section for a more advanced pagination component.
    - https://ui.shadcn.com/docs/components/data-table#reusable-components

### Sorting
getSortedRowModel

### Visibility
VisibilityState

# Anatomy of an extension
- Background scripts
    Scripts that respond to browser events.
- Icons
    For the extension and any buttons it might define.
- Sidebars, popups, and options pages
    HTML documents that provide content for various user interface components.
- Content scripts
    JavaScript included with your extension, that you will inject into web pages.
- Web-accessible resources
    Make packaged content accessible to web pages and content scripts.

