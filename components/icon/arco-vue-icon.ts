import type { App, Plugin } from 'vue';
import type { ArcoIconOptions } from '../_utils/types';


const icons: Record<string, Plugin> = {
  
};

const install = (app: App, options?: ArcoIconOptions) => {
  for (const key of Object.keys(icons)) {
    app.use(icons[key], options);
  }
};

const ArcoVueIcon = {
  ...icons,
  install
};

export default ArcoVueIcon;
