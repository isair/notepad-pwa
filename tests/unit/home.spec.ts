import { Wrapper, shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import Drawer from '@/components/Drawer.vue';
import Editor from '@/components/Editor.vue';

describe('Home.vue', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      stubs: ['drawer', 'editor'],
    });
  });

  it('renders the Drawer and Editor components', () => {
    expect(wrapper.findComponent(Drawer).exists()).toBeTruthy();
    expect(wrapper.findComponent(Editor).exists()).toBeTruthy();
  });

  it('adds a new tab when onTabAdd is called', async () => {
    const initialTabCount = (wrapper.vm as any).fileHandles.length;
    await (wrapper.vm as any).onTabAdd();
    expect((wrapper.vm as any).fileHandles.length).toBe(initialTabCount + 1);
  });

  it('removes the current tab when onTabRemove is called', async () => {
    await (wrapper.vm as any).onTabAdd();
    const initialTabCount = (wrapper.vm as any).fileHandles.length;
    await (wrapper.vm as any).onTabRemove(0);
    expect((wrapper.vm as any).fileHandles.length).toBe(initialTabCount - 1);
  });

  it('sets the activeIndex when onTabClick is called', async () => {
    await (wrapper.vm as any).onTabAdd();
    await (wrapper.vm as any).onTabClick(1);
    expect((wrapper.vm as any).activeIndex).toBe(1);
  });

  it('updates the tab change flag when onTabContentChange is called', async () => {
    await (wrapper.vm as any).onTabContentChange(0);
    expect((wrapper.vm as any).tabChangeFlags[0]).toBeTruthy();
  });
});
