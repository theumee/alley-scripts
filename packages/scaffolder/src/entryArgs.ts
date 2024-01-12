import { parse } from 'ts-command-line-args';

/**
 * The command line argument types.
 */
export type EntryArgs = {
  root?: string;
  'dry-run'?: boolean;
  help?: boolean;
};

/**
 * Set the script arguments and defaults.
 */
const entryArgs = parse<EntryArgs>(
  {
    root: {
      type: String,
      description: 'The path to a scaffolder configuration directory (.scaffolder).',
      optional: true,
    },
    'dry-run': {
      type: Boolean,
      description: 'Run the script without making any changes.',
      optional: true,
    },
    help: {
      type: Boolean,
      optional: true,
      alias: 'h',
      description: 'Prints this usage guide',
    },
  },
  {
    helpArg: 'help',
    headerContentSections: [{
      header: 'Alley Scaffolder',
      content: 'Scaffold templates for your projects and work faster.',
    }],
  },
);

export default entryArgs;
