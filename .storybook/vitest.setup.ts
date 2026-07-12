import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/nextjs-vite";

import * as projectAnnotations from "./preview";

// a11y annotations first so preview `parameters.a11y.test` is not overridden.
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
