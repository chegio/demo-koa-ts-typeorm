-- 用户表
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增ID' ,
  `user_no` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户编号，唯一标识' ,
  `user_name` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名称' ,
  `passwd_sha1` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'sha1加密后的密码' ,
  `mobile` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '手机',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) COMMENT '创建时间',
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) on update current_timestamp(3) COMMENT '更新时间',
  primary key (`id`) using btree,
  unique key `user_no_idx` (`user_no`) using btree
) engine = InnoDB
  AUTO_INCREMENT = 20
  DEFAULT charset = utf8mb4 
  COLLATE=utf8mb4_unicode_ci 
  row_format = dynamic
  COMMENT '用户表';