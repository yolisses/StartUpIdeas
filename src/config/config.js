export const data = {
	development: {
		username: 'postgres',
		password: 'postgres',
		database: 'startupideas_development',
		host: '127.0.0.1',
		dialect: 'postgres',
		define: {
			timeStamps: true,
			underscored: true,
		},
	},
	test: {
		username: 'postgres',
		password: 'postgres',
		database: 'startupideas_test',
		host: '127.0.0.1',
		dialect: 'postgres',
		define: {
			timeStamps: true,
			underscored: true,
		},
	},
	production: {
		username: 'nqdoydrlputywd',
		password:
			'6cb4d382b8c4f126ca6cef2a383b609affbc348aa866dfd5dbf74c4e0ea78024',
		database: 'dea99cja7gd5h4',
		ssl: true,
		host: 'ec2-23-21-4-7.compute-1.amazonaws.com',
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
		define: {
			timeStamps: true,
			underscored: true,
		},
	},
};
