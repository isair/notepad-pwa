import { shallowMount } from '@vue/test-utils';
import Editor from '@/components/Editor.vue';

describe('Editor.vue', () => {
  it.skip('renders props.value when passed', () => {
    const value = 'new value';
    const wrapper = shallowMount(Editor, {
      propsData: { value },
    });
    expect(wrapper.text()).toMatch(value);
  });
});
