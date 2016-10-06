class ngSidebarDropdownItem {
    constructor() {
        this.restrict = 'A'
        this.scope = {}
    }

    controller($scope, $state) {
        $scope.state = $state;
    }

    link(scope, element, attrs) {
        const target = attrs.ngSidebarDropdownItem
        
        const MOUSE_ENTER = "mouseenter"
        const MOUSE_LEAVE = "mouseleave"
        const windowElm = $(window)
        let currentSize = ""

        const dropdownAction = function(e) {
          const elm = $(`.sidebar-menu ul.sidebar-nav > li > a[ng-sidebar-dropdown-item="${target}"]`)
          const offset = elm.offset()
          const elmRect = elm.get(0).getBoundingClientRect()
          const rootElm = $(`.sidebar-menu .dropdown-root`)
          const targetElm = $(`.sidebar-menu .dropdown-root .dropdown-section[ng-sidebar-dropdown="${target}"]`)
          const targetElmRect = targetElm.get(0).getBoundingClientRect()

          switch(e.type) {
            case MOUSE_ENTER:
              if(!targetElm.hasClass("active")) {
                rootElm.css({ top: offset.top + (elmRect.height/2) - (targetElmRect.height/2), width: targetElmRect.width, height: targetElmRect.height })
                rootElm.addClass("active")
                targetElm.addClass("active")
              }
              break;
            case MOUSE_LEAVE:
              rootElm.css({ height: 0 })
              rootElm.removeClass("active")
              targetElm.removeClass("active")
              break;
            default:
              if(!targetElm.hasClass("active")) {
                rootElm.css({ top: offset.top + (elmRect.height/2) - (targetElmRect.height/2), width: targetElmRect.width, height: targetElmRect.height })
                rootElm.addClass("active")
                targetElm.addClass("active")
              }
              break;
          }
        }

        const dropdownBinding = function(bind) {
          const w = windowElm.width()

          if(currentSize == "desktop" && w <= 768) {
            /* Switch to Mobile */
            $(".sidebar-menu [ng-sidebar-dropdown], .sidebar-menu [ng-sidebar-dropdown-item]").unbind("mouseenter mouseleave").bind("click", dropdownAction)
            currentSize = "mobile"
          } else if(currentSize == "mobile" && w > 768) {
            /* Switch to Desktop */
            $(".sidebar-menu [ng-sidebar-dropdown], .sidebar-menu [ng-sidebar-dropdown-item]").unbind("click").bind("mouseenter mouseleave", dropdownAction)
            currentSize = "desktop"
          } else {
            if(w <= 768) {
              /* Init Mobile */
              $(".sidebar-menu [ng-sidebar-dropdown], .sidebar-menu [ng-sidebar-dropdown-item]").unbind("mouseenter mouseleave").bind("click", dropdownAction)
              currentSize = "mobile"
            } else {
              /* Init Desktop */
              $(".sidebar-menu [ng-sidebar-dropdown]").unbind("click").bind("mouseenter mouseleave", dropdownAction)
              currentSize = "desktop"
            }
          }


          /* Back Button Binding */
          $(".sidebar-dropdown-toggle").unbind("click").bind("click", function() {
            const rootElm = $(`.sidebar-menu .dropdown-root`)
            const allTarget = $(`.sidebar-menu .dropdown-root .dropdown-section`)
            rootElm.removeClass("active")
            allTarget.removeClass("active")
          })
        }

        const init = function() {
          dropdownBinding()

          windowElm.resize(function() {
            dropdownBinding()
          })
        }

        init()
    }
}

export default ngSidebarDropdownItem