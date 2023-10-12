module.exports = (sequelize, DataTypes) => (
    sequelize.define('transfer', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          player: {
            type: DataTypes.STRING(45),
            collate: 'utf8mb3_bin',
            defaultValue: null,
          },
          to: {
            type: DataTypes.STRING(45),
            collate: 'utf8mb3_bin',
            defaultValue: null,
          },
          from: {
            type: DataTypes.STRING(45),
            collate: 'utf8mb3_bin',
            defaultValue: null,
          },
          price: {
            type: DataTypes.STRING(45),
            collate: 'utf8mb3_bin',
            defaultValue: null,
          },
    }, {
        tableName: 'transfer', // 테이블 이름 설정
        paranoid: true,
        timestamps: false, // createdAt, updatedAt 컬럼 자동 생성 비활성화
        engine: 'InnoDB',
        charset: 'utf8mb3',
        collate: 'utf8mb3_bin',
    })
  );
  