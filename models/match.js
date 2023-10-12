module.exports = (sequelize, DataTypes) => (
    sequelize.define('match', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          home: {
            type: DataTypes.STRING(45),
            collate: 'utf8mb3_bin',
            defaultValue: null,
          },
          away: {
            type: DataTypes.STRING(45),
            collate: 'utf8mb3_bin',
            defaultValue: null,
          },
          property: {
            type: DataTypes.STRING(45),
            collate: 'utf8mb3_bin',
            defaultValue: null,
          },
          date: {
            type: DataTypes.STRING(45),
            collate: 'utf8mb3_bin',
            defaultValue: null,
          },
          place: {
            type: DataTypes.STRING(45),
            collate: 'utf8mb3_bin',
            defaultValue: null,
          },
          home_win: {
            type: DataTypes.INTEGER,
            defaultValue: null,
          },
          home_draw: {
            type: DataTypes.INTEGER,
            defaultValue: null,
          },
          home_lose: {
            type: DataTypes.INTEGER,
            defaultValue: null,
          },
          home_mmr: {
            type: DataTypes.INTEGER,
            defaultValue: null,
          },
          away_mmr: {
            type: DataTypes.INTEGER,
            defaultValue: null,
          },
    }, {
        tableName: 'match', // 테이블 이름 설정
        paranoid: true,
        timestamps: false, // createdAt, updatedAt 컬럼 자동 생성 비활성화
        engine: 'InnoDB',
        charset: 'utf8mb3',
        collate: 'utf8mb3_bin',
    })
  );
  