// @flow strict-local

import {registerSerializableClass} from '@parcel/utils';
import Asset from './Asset';
import AssetGraph from './AssetGraph';
import BundleGraph from './BundleGraph';
import Config from './Config';
import Dependency from './Dependency';
import Environment from './Environment';
// $FlowFixMe this is untyped
import packageJson from '../package.json';

const packageVersion = packageJson.version;
if (typeof packageVersion !== 'string') {
  throw new Error('Expected package version to be a string');
}

let registered;
export default function registerCoreWithSerializer() {
  if (registered) {
    return;
  }

  register(Asset);
  register(AssetGraph);
  register(BundleGraph);
  register(Config);
  register(Dependency);
  register(Environment);
  registered = true;
}

function register(ctor: Class<*>): void {
  registerSerializableClass(packageVersion + ':' + ctor.name, ctor);
}
