/* ========================================
   MTAB v1.54 - 修复滚轮阈值问题
   每次修改版本号 +0.01
   ======================================== */

var timeSettings = {
    show: zbp.cookie.get('timeShow') !== '0',
    hour24: zbp.cookie.get('time24h') !== '0',
    seconds: zbp.cookie.get('timeSeconds') !== '0',
    week: zbp.cookie.get('timeWeek') !== '0',
    color: zbp.cookie.get('timeColor') || '#ffffff'
};

var lastTimeStr = '';
var lastDateStr = '';

function initTimeSettings() {
    document.getElementById('timeShow').checked = timeSettings.show;
    document.getElementById('time24h').checked = timeSettings.hour24;
    document.getElementById('timeSeconds').checked = timeSettings.seconds;
    document.getElementById('timeWeek').checked = timeSettings.week;
    setTimeColor(timeSettings.color, false);
}

function updateTimeSettings() {
    timeSettings.show = document.getElementById('timeShow').checked;
    timeSettings.hour24 = document.getElementById('time24h').checked;
    timeSettings.seconds = document.getElementById('timeSeconds').checked;
    timeSettings.week = document.getElementById('timeWeek').checked;
    zbp.cookie.set('timeShow', timeSettings.show ? '1' : '0', 365);
    zbp.cookie.set('time24h', timeSettings.hour24 ? '1' : '0', 365);
    zbp.cookie.set('timeSeconds', timeSettings.seconds ? '1' : '0', 365);
    zbp.cookie.set('timeWeek', timeSettings.week ? '1' : '0', 365);
}

function setTimeColor(color, save = true) {
    timeSettings.color = color;
    document.getElementById('mtab-time').style.color = color;
    document.querySelectorAll('.cc-color').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.cc-color').forEach(c => {
        if (c.style.background === color || c.style.backgroundColor === color) {
            c.classList.add('active');
        }
    });
    if (save) zbp.cookie.set('timeColor', color, 365);
}

function updateTime() {
    if (!timeSettings.show) {
        document.getElementById('mtab-time').style.display = 'none';
        return;
    }
    document.getElementById('mtab-time').style.display = 'block';
    
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][now.getDay()];
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    
    if (!timeSettings.hour24) {
        var period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
    }
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    var timeStr = hours + ':' + minutes;
    if (timeSettings.seconds) timeStr += ':' + seconds;
    if (!timeSettings.hour24) timeStr += ' ' + period;
    
    var dateStr = year + '-' + month + '-' + date;
    if (timeSettings.week) dateStr += ' ' + day;
    
    requestAnimationFrame(function() {
        if (timeStr !== lastTimeStr) {
            var timeEl = document.querySelector('#mtab-time .time-main');
            if (timeEl) {
                timeEl.textContent = timeStr;
            } else {
                document.getElementById('mtab-time').innerHTML = 
                    '<div class="time-main">' + timeStr + '</div>' +
                    '<div class="time-sub">' + dateStr + '</div>';
            }
            lastTimeStr = timeStr;
        }
        
        if (dateStr !== lastDateStr) {
            var dateEl = document.querySelector('#mtab-time .time-sub');
            if (dateEl) {
                dateEl.textContent = dateStr;
            }
            lastDateStr = dateStr;
        }
    });
}

function bindTimeSettings() {
    var toggles = ['timeShow', 'time24h', 'timeSeconds', 'timeWeek'];
    toggles.forEach(function(id) {
        var el = document.getElementById(id);
        if (el && !el.dataset.bound) {
            el.dataset.bound = '1';
            el.addEventListener('change', function() {
                updateTimeSettings();
                updateTime();
            });
        }
    });
    
    document.querySelectorAll('.cc-color').forEach(function(c) {
        if (!c.dataset.bound) {
            c.dataset.bound = '1';
            c.addEventListener('click', function() {
                var color = this.style.background || this.style.backgroundColor;
                setTimeColor(color);
            });
        }
    });
}

console.log('mtab.js 加载成功 v1.54');

// 用全局变量保存原始 txpostajax，防止重复覆盖
if (typeof tx_host !== 'undefined' && typeof window.originalTxpostajax === 'undefined') {
    console.log('tx_host 存在:', tx_host);
    window.originalTxpostajax = txpostajax;
    txpostajax = function(url) {
        console.log('txpostajax 被调用, url:', url);
        
        // 额外处理侧边栏选中状态和当前分类ID
        var cidMatch = url.match(/cid=(\d+)/);
        if (cidMatch) {
            var cid = cidMatch[1];
            console.log('找到 cid:', cid);
            window.current_cid = cid;
            
            var getidEl = document.getElementById('getid');
            if (getidEl) {
                getidEl.value = cid;
            }
            
            // 延时设置侧边栏选中状态，等内容加载完
            setTimeout(function() {
                var sidebarItems = document.querySelectorAll('.sidebar-cate-item');
                sidebarItems.forEach(function(item) {
                    if (!item.classList.contains('sidebar-add-cate')) {
                        item.classList.remove('on');
                        if (item.dataset.id == cid) {
                            item.classList.add('on');
                        }
                    }
                });
                // 重新绑定事件
                bindSidebarCates();
            }, 400);
        }
        
        // 调用原来的函数
        window.originalTxpostajax(url);
    };
}

function applyIconSettings() {
    var size = zbp.cookie.get('iconSize') || 64;
    var radius = zbp.cookie.get('iconRadius');
    var gapX = zbp.cookie.get('iconGapX');
    var gapY = zbp.cookie.get('iconGapY');
    var textColor = zbp.cookie.get('iconTextColor');
    var iconBgColor = zbp.cookie.get('iconBgColor');
    
    if (size) {
        size = Math.max(60, Math.min(80, parseInt(size)));
        document.documentElement.style.setProperty('--icon-size', size + 'px');
        var iconSizeInput = document.getElementById('iconSize');
        if (iconSizeInput) iconSizeInput.value = size;
    }
    
    if (radius) {
        document.documentElement.style.setProperty('--icon-radius', radius + 'px');
    }
    
    if (iconBgColor) {
        document.documentElement.style.setProperty('--icon-bg-color', iconBgColor);
    }
    
    if (gapX) {
        document.documentElement.style.setProperty('--icon-gap-x', gapX + 'px');
    }
    
    if (gapY) {
        document.documentElement.style.setProperty('--icon-gap-y', gapY + 'px');
    }
    
    if (textColor) {
        document.documentElement.style.setProperty('--icon-name-color', textColor);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var timeEl = document.getElementById('mtab-time');
    if (timeEl) {
        timeEl.innerHTML = '<div class="time-main"></div><div class="time-sub"></div>';
        updateTime();
        setInterval(updateTime, 250);
    }
    bindTimeSettings();
    bindSidebarCates();
    
    var savedTimeColor = zbp.cookie.get('timeColor');
    if (savedTimeColor) {
        var timeColorInput = document.getElementById('timeColor');
        if (timeColorInput) {
            timeColorInput.value = savedTimeColor;
        }
    }
});

function bindSidebarCates() {
    console.log('bindSidebarCates 开始执行');
    
    document.querySelectorAll('.sidebar-cate-item').forEach(function(item, index) {
        if (item.dataset.bound) return;
        item.dataset.bound = '1';
        console.log('绑定侧边栏项目:', index, item);
        
        item.addEventListener('click', function(e) {
            console.log('侧边栏项目被点击');
            if (this.classList.contains('sidebar-add-cate')) {
                console.log('点击的是添加按钮，不执行分类切换');
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            document.querySelectorAll('.sidebar-cate-item').forEach(i => i.classList.remove('on'));
            this.classList.add('on');
            
            var cid = this.dataset.id;
            window.current_cid = cid;
            var url = tx_host + '?txact=list&cid=' + cid;
            console.log('准备调用 txpostajax, url:', url);
            switchCateWithAnimation(url, 'click');
        });
    });

    // 同时兼容原来的.ajax-item（顶部分类）
    console.log('开始绑定 ajax-item');
    document.querySelectorAll('.ajax-item').forEach(function(item, index) {
        if (item.dataset.bound) return;
        item.dataset.bound = '1';
        console.log('绑定 ajax-item:', index, item);
        
        item.addEventListener('click', function(e) {
            console.log('ajax-item 被点击');
            e.preventDefault();
            e.stopPropagation();
            
            var url = this.dataset.url;
            var urlMatch = url && url.match(/cid=(\d+)/);
            if (urlMatch && urlMatch[1]) {
                window.current_cid = urlMatch[1];
            }
            console.log('准备调用 txpostajax, url:', url);
            switchCateWithAnimation(url, 'click');
        });
    });
}

var currentRightClickItem = null;

var _toggleControlCenter = toggleControlCenter;
toggleControlCenter = function() {
    _toggleControlCenter();
    setTimeout(function() {
        initTimeSettings();
        bindTimeSettings();
    }, 50);
};

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    var menu = document.getElementById('rightMenu');
    
    currentRightClickItem = null;
    var setItem = e.target.closest('.set-item');
    var sidebarCateItem = e.target.closest('.sidebar-cate-item');
    
    var editItem = menu.querySelector('.menu-item-edit');
    var deleteItem = menu.querySelector('.menu-item-delete');
    var allDividers = menu.querySelectorAll('.menu-divider');
    var menuItems = menu.querySelectorAll('.menu-item');
    
    if (setItem || sidebarCateItem) {
        currentRightClickItem = setItem || sidebarCateItem;
        editItem.style.display = 'flex';
        deleteItem.style.display = 'flex';
        allDividers[0].style.display = 'block';
        allDividers[1].style.display = 'block';
        for (var i = 2; i < 7; i++) {
            menuItems[i].style.display = 'none';
        }
    } else {
        editItem.style.display = 'none';
        deleteItem.style.display = 'none';
        allDividers[0].style.display = 'none';
        allDividers[1].style.display = 'block';
        for (var i = 2; i < 7; i++) {
            menuItems[i].style.display = 'flex';
        }
    }
    
    menu.style.display = 'block';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    
    if (document.body.classList.contains('tx-night')) {
        document.getElementById('menu-dark-icon').className = 'iconfont icon-heitian';
        document.getElementById('menu-dark-text').textContent = '明亮模式';
    } else {
        document.getElementById('menu-dark-icon').className = 'iconfont icon-baitian';
        document.getElementById('menu-dark-text').textContent = '暗黑模式';
    }
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('#rightMenu')) {
        document.getElementById('rightMenu').style.display = 'none';
    }
});

function addWebsite(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    var cid = document.getElementById('getid').value || window.current_cid || '2';
    var fakeBtn = document.createElement('a');
    fakeBtn.setAttribute('data-id', cid);
    txPostIDpop(fakeBtn, '添加网站', '.article-box');
}

function toggleDarkMode(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    document.body.classList.toggle('tx-night');
    if (document.body.classList.contains('tx-night')) {
        zbp.cookie.set('tx_bgstyle', 'on', 365);
    } else {
        zbp.cookie.set('tx_bgstyle', 'off', 365);
    }
}

function toggleControlCenter(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    var cc = document.getElementById('controlCenter');
    cc.style.display = cc.style.display === 'block' ? 'none' : 'block';
    
    if (cc.style.display === 'block') {
        bindControlCenterMenu();
        loadDockSettings();
    }
}

function loadDockSettings() {
    var dockEnabled = zbp.cookie.get('dockEnabled') !== '0';
    var bgColor = zbp.cookie.get('sidebarBgColor') || '#4b4b4b';
    var opacity = zbp.cookie.get('sidebarOpacity') || '17';
    var blur = zbp.cookie.get('sidebarBlur');
    
    document.getElementById('dockEnabled').checked = dockEnabled;
    document.getElementById('sidebarBgColor').value = bgColor;
    document.getElementById('sidebarOpacity').value = opacity;
    
    if (blur === '0') {
        document.getElementById('sidebarBlur').checked = false;
    }
    
    var textColor = zbp.cookie.get('iconTextColor');
    var iconBgColor = zbp.cookie.get('iconBgColor');
    var size = zbp.cookie.get('iconSize');
    var radius = zbp.cookie.get('iconRadius');
    var gapX = zbp.cookie.get('iconGapX');
    var gapY = zbp.cookie.get('iconGapY');
    
    if (textColor) document.getElementById('iconTextColor').value = textColor;
    if (iconBgColor) document.getElementById('iconBgColor').value = iconBgColor;
    if (size) document.getElementById('iconSize').value = size;
    if (radius) document.getElementById('iconRadius').value = radius;
    if (gapX) document.getElementById('iconGapX').value = gapX;
    if (gapY) document.getElementById('iconGapY').value = gapY;
    
    updateSliderValue('sidebarOpacity');
    updateSliderValue('iconSize');
    updateSliderValue('iconRadius');
    updateSliderValue('iconGapX');
    updateSliderValue('iconGapY');
}

function bindControlCenterMenu() {
    var menuItems = document.querySelectorAll('.cc-menu-item');
    menuItems.forEach(function(item) {
        item.onclick = function() {
            var panel = this.dataset.panel;
            
            menuItems.forEach(function(i) {
                i.classList.remove('active');
            });
            this.classList.add('active');
            
            var panelItems = document.querySelectorAll('.cc-panel-item');
            panelItems.forEach(function(p) {
                p.classList.remove('cc-panel-active');
                if (p.dataset.panel === panel) {
                    p.classList.add('cc-panel-active');
                }
            });
        };
    });
}

function hexToRgb(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return {r, g, b};
}

function toggleDock() {
    var checkbox = document.getElementById('dockEnabled');
    var sidebar = document.querySelector('.mtab-sidebar');
    var main = document.querySelector('.mtab-main');
    var header = document.querySelector('.mtab-header');
    
    if (checkbox.checked) {
        sidebar.style.transform = 'translateX(0)';
        main.style.marginLeft = '54px';
        header.style.marginLeft = '54px';
        zbp.cookie.set('dockEnabled', '1', 365);
    } else {
        sidebar.style.transform = 'translateX(-100%)';
        main.style.marginLeft = '0';
        header.style.marginLeft = '0';
        zbp.cookie.set('dockEnabled', '0', 365);
    }
}

function setSidebarBgColor() {
    var color = document.getElementById('sidebarBgColor').value;
    var opacity = (document.getElementById('sidebarOpacity').value || 17) / 100;
    var rgb = hexToRgb(color);
    var rgba = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity + ')';
    
    var sidebar = document.querySelector('.mtab-sidebar');
    sidebar.style.backgroundColor = rgba;
    
    zbp.cookie.set('sidebarBgColor', color, 365);
}

function setSidebarOpacity() {
    var color = document.getElementById('sidebarBgColor').value;
    var opacity = document.getElementById('sidebarOpacity').value / 100;
    var rgb = hexToRgb(color);
    var rgba = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity + ')';
    
    var sidebar = document.querySelector('.mtab-sidebar');
    sidebar.style.backgroundColor = rgba;
    
    zbp.cookie.set('sidebarOpacity', document.getElementById('sidebarOpacity').value, 365);
}

function toggleSidebarBlur() {
    var sidebar = document.querySelector('.mtab-sidebar');
    var checkbox = document.getElementById('sidebarBlur');
    
    if (checkbox.checked) {
        sidebar.style.backdropFilter = 'blur(8px)';
        zbp.cookie.set('sidebarBlur', '1', 365);
    } else {
        sidebar.style.backdropFilter = 'none';
        zbp.cookie.set('sidebarBlur', '0', 365);
    }
}

function setIconTextColor() {
    var color = document.getElementById('iconTextColor').value;
    document.documentElement.style.setProperty('--icon-name-color', color);
    zbp.cookie.set('iconTextColor', color, 365);
}

function setIconBgColor() {
    var color = document.getElementById('iconBgColor').value;
    document.documentElement.style.setProperty('--icon-bg-color', color);
    zbp.cookie.set('iconBgColor', color, 365);
}

function setIconSize() {
    var size = document.getElementById('iconSize').value;
    size = Math.max(60, Math.min(80, parseInt(size)));
    document.getElementById('iconSize').value = size;
    document.documentElement.style.setProperty('--icon-size', size + 'px');
    zbp.cookie.set('iconSize', size, 365);
}

function setIconRadius() {
    var radius = document.getElementById('iconRadius').value;
    document.documentElement.style.setProperty('--icon-radius', radius + 'px');
    zbp.cookie.set('iconRadius', radius, 365);
}

function setIconGapX() {
    var gap = document.getElementById('iconGapX').value;
    document.documentElement.style.setProperty('--icon-gap-x', gap + 'px');
    zbp.cookie.set('iconGapX', gap, 365);
}

function setIconGapY() {
    var gap = document.getElementById('iconGapY').value;
    document.documentElement.style.setProperty('--icon-gap-y', gap + 'px');
    zbp.cookie.set('iconGapY', gap, 365);
}

function updateSliderValue(id) {
    var val = document.getElementById(id).value;
    document.getElementById(id + 'Val').textContent = val;
}

function editCurrentItem(e) {
    if (e) e.stopPropagation();
    if (!currentRightClickItem) return;
    document.getElementById('rightMenu').style.display = 'none';
    
    openAddTabModal(e, true);
    
    setTimeout(function() {
        $('.add-tab-modal .tab-btn[data-tab="manual"]').click();
        
        var delBtn = currentRightClickItem.querySelector('.del-btn a:last-child');
        
        if (delBtn && delBtn.dataset.type !== 'cate') {
            var name = currentRightClickItem.querySelector('.data-name') ? currentRightClickItem.querySelector('.data-name').textContent : '';
            var img = currentRightClickItem.querySelector('.data-img') ? currentRightClickItem.querySelector('.data-img').src : '';
            var url = currentRightClickItem.querySelector('a') ? currentRightClickItem.querySelector('a').href : '';
            
            var bgColor = currentRightClickItem.dataset.bgColor || '#ffffff';
            
            var modalForm = document.querySelector('.add-tab-modal .tab-pane[data-tab="manual"]');
            if (modalForm) {
                modalForm.querySelector('[name="modal_name"]').value = name;
                modalForm.querySelector('[name="modal_url"]').value = url;
                modalForm.querySelector('[name="modal_img"]').value = img;
                modalForm.querySelector('[name="modal_color"]').value = bgColor;
                modalForm.querySelector('[name="modal_modify"]').value = delBtn.dataset.id;
            }
            
            var colorOptions = document.querySelectorAll('.color-option');
            colorOptions.forEach(function(opt) {
                opt.classList.remove('active');
                if (opt.dataset.color === bgColor) {
                    opt.classList.add('active');
                }
            });
        }
    }, 100);
}

function deleteCurrentItem(e) {
    if (e) e.stopPropagation();
    if (!currentRightClickItem) return;
    document.getElementById('rightMenu').style.display = 'none';
    
    var delBtn = currentRightClickItem.querySelector('.del-btn a');
    if (delBtn && delBtn.dataset.id) {
        txPostIDpop(delBtn, '删除', '.del-box');
    }
}

function openAddTabModal(e, isEdit) {
    if (e) e.stopPropagation();
    
    var modal = document.getElementById('addTabModal');
    modal.classList.add('show');
    
    if (!isEdit) {
        var modalForm = modal.querySelector('.tab-pane[data-tab="manual"]');
        if (modalForm) {
            modalForm.querySelector('[name="modal_name"]').value = '';
            modalForm.querySelector('[name="modal_url"]').value = '';
            modalForm.querySelector('[name="modal_img"]').value = '';
            modalForm.querySelector('[name="modal_modify"]').value = '';
        }
    }
}

function closeAddTabModal() {
    var modal = document.getElementById('addTabModal');
    modal.classList.remove('show');
}

function createNewFolder(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    txPostIDpop({dataset: {id: window.current_cid}}, '添加子分类', '.cate-box');
}

function openWallpaperSettings(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
}

function toggleBatchEdit(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
}

function saveTab(btn, continueAdd) {
    var modalForm = btn.closest('.tab-pane');
    var modal = btn.closest('.add-tab-modal');
    
    var name = modalForm.querySelector('[name="modal_name"]').value;
    var url = modalForm.querySelector('[name="modal_url"]').value;
    var img = modalForm.querySelector('[name="modal_img"]').value;
    var modify = modalForm.querySelector('[name="modal_modify"]').value;
    var color = modalForm.querySelector('[name="modal_color"]').value || '#ffffff';
    var order = modalForm.querySelector('[name="modal_order"]').value || '99';
    
    if (!name || !url) {
        alert('请填写名称和网址');
        return false;
    }
    
    var formData = new FormData();
    formData.append('name', name);
    formData.append('url', url);
    formData.append('img', img);
    formData.append('info', modalForm.querySelector('[name="modal_info"]').value || '');
    formData.append('order', order);
    formData.append('color', color);
    formData.append('author', modalForm.querySelector('[name="modal_author"]').value);
    formData.append('token', modalForm.querySelector('[name="modal_token"]').value);
    
    if (modify) {
        formData.append('modify', modify);
    }
    
    fetch(tx_host + '?txact=add', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.err) {
            alert(data.msg);
        } else {
            if (continueAdd) {
                modalForm.querySelector('[name="modal_name"]').value = '';
                modalForm.querySelector('[name="modal_url"]').value = '';
                modalForm.querySelector('[name="modal_img"]').value = '';
                txpostajax(tx_host + '?txact=list&cid=' + window.current_cid);
            } else {
                closeAddTabModal();
                txpostajax(tx_host + '?txact=list&cid=' + window.current_cid);
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('提交失败');
    });
    
    return false;
}

// 滚轮切换分类功能 - 修复版
// 增大阈值到80，避免阻止正常页面滚动
var wheelScrollThreshold = 80;
var wheelScrollTimeout = null;

document.addEventListener('wheel', function(e) {
    // 如果有弹窗，不处理滚轮
    if ($('.tx-pop').length > 0 || $('.set-on-box').length > 0) {
        return;
    }
    
    // 只有大幅滚动才切换分类
    if (Math.abs(e.deltaY) > wheelScrollThreshold) {
        e.preventDefault();
        
        // 防抖处理
        if (wheelScrollTimeout) {
            clearTimeout(wheelScrollTimeout);
        }
        
        wheelScrollTimeout = setTimeout(function() {
            if (e.deltaY > 0) {
                // 向下滚动，切换到下一个分类
                switchCateByScroll('down');
            } else if (e.deltaY < 0) {
                // 向上滚动，切换到上一个分类
                switchCateByScroll('up');
            }
        }, 100);
    }
}, { passive: false });

// 分类切换函数 - 修复版，确保函数完整性
function switchCateWithAnimation(url, direction) {
    var mainInfo = document.querySelector('.main-info');
    if (mainInfo) {
        mainInfo.style.transition = 'all 0.25s ease-out';
        if (direction === 'down') {
            mainInfo.style.transform = 'translateY(-60px)';
        } else if (direction === 'up') {
            mainInfo.style.transform = 'translateY(60px)';
        } else {
            mainInfo.style.transform = 'scale(0.95)';
        }
        mainInfo.style.opacity = '0';

        setTimeout(function() {
            txpostajax(url);

            setTimeout(function() {
                var newMainInfo = document.querySelector('.main-info');
                if (newMainInfo) {
                    if (direction === 'down') {
                        newMainInfo.style.transform = 'translateY(60px)';
                    } else if (direction === 'up') {
                        newMainInfo.style.transform = 'translateY(-60px)';
                    } else {
                        newMainInfo.style.transform = 'scale(1.05)';
                    }
                    newMainInfo.style.opacity = '0';
                    newMainInfo.offsetHeight;
                    newMainInfo.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    newMainInfo.style.transform = 'translateY(0) scale(1)';
                    newMainInfo.style.opacity = '1';
                }
            }, 80);
        }, 250);
    } else {
        txpostajax(url);
    }
}

// 滚轮切换分类逻辑
function switchCateByScroll(direction) {
    var sidebarItems = document.querySelectorAll('.sidebar-cate-item:not(.sidebar-add-cate)');
    var currentItem = document.querySelector('.sidebar-cate-item.on');
    var currentIndex = 0;
    
    sidebarItems.forEach(function(item, index) {
        if (item === currentItem) {
            currentIndex = index;
        }
    });
    
    var nextIndex;
    if (direction === 'down') {
        nextIndex = (currentIndex + 1) % sidebarItems.length;
    } else {
        nextIndex = (currentIndex - 1 + sidebarItems.length) % sidebarItems.length;
    }
    
    var nextItem = sidebarItems[nextIndex];
    if (nextItem) {
        nextItem.click();
    }
}

console.log('MTAB JS v1.54 加载完成 - 滚轮阈值已修复为 80');
