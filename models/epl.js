module.exports = (sequelize, DataTypes) => (
    sequelize.define('Epl', {
      num: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      tier: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      prev_win: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      prev_draw: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      prev_lose: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      curr_win: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      curr_draw: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      curr_lose: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      curr_points: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      curr_mmr: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    }, {
      tableName: 'epl', // 테이블 이름 설정
      paranoid: true,
      timestamps: false, // createdAt, updatedAt 컬럼 자동 생성 비활성화
    })
  );
  