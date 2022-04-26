module.exports = {
  apps: [{
      name: 'app',
      script: './strapiloader.js',
      exec_interpreter: 'node',
      instances : '2',
      exec_mode : 'cluster',
      merge_logs: true,
      autorestart: true,
      log_file: '/dev/null',
      out_file: '/dev/null',
      error_file: '/dev/null',
    },
  ],
};
