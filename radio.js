(() => {
    'use strict';
    const descriptions = {
        positive: {
            zh: '以节奏建立秩序，以声音勾勒框架。在清晰的结构与重复中，让律动逐渐展开。',
            en: 'Rhythm establishes order; sound defines a framework. Within clear structures and repetition, movement gradually unfolds.'
        },
        negative: {
            zh: '声音之间的留白，与声音本身同样重要。停顿、距离与余韵勾勒出空间的边界，为整体带来纵深与平衡。',
            en: 'The space between sounds matters as much as sound itself. Pauses, distance, and resonance define its boundaries, bringing depth and balance to the whole.'
        },
        neutral: {
            zh: '在规整与错位之间，寻找流动中的平衡。碎拍交织，节奏轻盈游移，为意料之外的转向留下空间。',
            en: 'Between regular patterns and rhythmic shifts, balance emerges through movement. Broken beats intertwine, rhythms move playfully, and unexpected turns find room to unfold.'
        }
    };
    const tabs = [...document.querySelectorAll('.radio-tab')];
    const episodes = [...document.querySelectorAll('.radio-episode')];
    const panel = document.getElementById('radio-panel');
    const frame = document.getElementById('radio-frame');
    let selectedProgram = '3731920185';

    function selectProgram(id) {
        const episode = episodes.find(item => item.dataset.program === id);
        if (!episode) return;
        selectedProgram = id;
        episodes.forEach(item => item.setAttribute('aria-pressed', String(item === episode)));
        const url = `https://music.163.com/outchain/player?type=3&id=${id}&auto=0&height=66`;
        if (frame.getAttribute('src') !== url) frame.src = url;
        frame.title = `${episode.querySelector('strong').textContent} 网易云音频播放器`;
        document.getElementById('radio-source').href = `https://music.163.com/program?id=${id}`;
    }

    function selectChannel(tab) {
        const channel = tab.dataset.channel;
        tabs.forEach(item => {
            const selected = item === tab;
            item.setAttribute('aria-selected', String(selected));
            item.tabIndex = selected ? 0 : -1;
        });
        panel.setAttribute('aria-labelledby', tab.id);
        document.getElementById('radio-description-zh').textContent = descriptions[channel].zh;
        document.getElementById('radio-description-en').textContent = descriptions[channel].en;
        const available = channel === 'neutral';
        document.getElementById('radio-episodes').hidden = !available;
        document.getElementById('radio-player').hidden = !available;
        document.getElementById('radio-empty').hidden = available;
        if (available) selectProgram(selectedProgram);
        else frame.removeAttribute('src');
    }
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectChannel(tab));
        tab.addEventListener('keydown', event => {
            let next;
            if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
            else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = tabs.length - 1;
            else return;
            event.preventDefault();
            tabs[next].focus();
            selectChannel(tabs[next]);
        });
    });
    episodes.forEach(episode => episode.addEventListener('click', () => selectProgram(episode.dataset.program)));
})();
