#!/bin/bash
# 医美神话叙事学 - 服务器管理脚本

PORT=28008
LOG_FILE="server.log"

case "$1" in
    start)
        # 检查是否已经在运行
        if lsof -i :$PORT > /dev/null 2>&1; then
            echo "⚠️  服务器已经在端口 $PORT 运行"
            ps aux | grep "http.server $PORT" | grep -v grep
        else
            echo "🚀 启动服务器（端口 $PORT）..."
            nohup python3 -m http.server $PORT > $LOG_FILE 2>&1 &
            sleep 2
            if lsof -i :$PORT > /dev/null 2>&1; then
                PID=$(lsof -ti :$PORT)
                echo "✅ 服务器启动成功！"
                echo "📍 访问地址: http://localhost:$PORT"
                echo "🆔 进程ID: $PID"
                echo "📝 日志文件: $LOG_FILE"
            else
                echo "❌ 服务器启动失败"
            fi
        fi
        ;;

    stop)
        echo "⏹️  停止服务器..."
        PID=$(lsof -ti :$PORT)
        if [ -n "$PID" ]; then
            kill $PID
            echo "✅ 服务器已停止（PID: $PID）"
        else
            echo "ℹ️  服务器未运行"
        fi
        ;;

    restart)
        $0 stop
        sleep 2
        $0 start
        ;;

    status)
        echo "📊 服务器状态："
        if lsof -i :$PORT > /dev/null 2>&1; then
            echo "✅ 运行中"
            echo ""
            echo "进程信息："
            ps aux | grep "http.server $PORT" | grep -v grep
            echo ""
            echo "端口信息："
            lsof -i :$PORT
            echo ""
            echo "📍 访问地址: http://localhost:$PORT"
        else
            echo "❌ 未运行"
        fi
        ;;

    log)
        if [ -f "$LOG_FILE" ]; then
            echo "📝 服务器日志（最后20行）："
            echo "================================"
            tail -20 $LOG_FILE
        else
            echo "ℹ️  日志文件不存在"
        fi
        ;;

    *)
        echo "医美神话叙事学 - 服务器管理脚本"
        echo ""
        echo "用法: $0 {start|stop|restart|status|log}"
        echo ""
        echo "命令说明："
        echo "  start    - 启动服务器"
        echo "  stop     - 停止服务器"
        echo "  restart  - 重启服务器"
        echo "  status   - 查看服务器状态"
        echo "  log      - 查看服务器日志"
        echo ""
        echo "示例："
        echo "  $0 start     # 启动服务器"
        echo "  $0 status    # 查看状态"
        echo "  $0 log       # 查看日志"
        exit 1
        ;;
esac

exit 0
